import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post';
import { ApiService } from '../../shared/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  post: Post = {
    _id: '',
    title: '',
    content: '',
    username: ''
  };

  allPosts: Post[] = [];
  _id = '';
  title = '';
  content = '';
  username = '';

  // Modal control flags
  showCreateModal = false;
  showEditModal = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.resetForm();
    this.getAllPosts();
  }

  resetForm() {
    this._id = '';
    this.title = '';
    this.content = '';
    this.username = '';
  }

  getAllPosts() {
    this.api.getAllPosts().subscribe({
      next: (res) => (this.allPosts = res),
      error: (err) => console.error('Error fetching posts:', err),
    });
  }

  getPostById(post: Post) {
    this.api.getPostById(post._id || '').subscribe({
      next: (res) => {
        this._id = res._id || '';
        this.title = res.title;
        this.content = res.content;
        this.username = res.username;
        this.showEditModal = true;
      },
      error: (err) => console.error('Error fetching post:', err),
    });
  }

  deletePostData(post: Post) {
    if (window.confirm(`Are you sure you want to delete this post: ${post._id}?`)) {
      this.api.deletePost(post._id || '').subscribe({
        next: () => this.getAllPosts(),
        error: (err) => console.error('Error deleting post:', err),
      });
    }
  }

  createPostData() {
    if (!this.title || !this.content || !this.username) {
      alert('Please fill in all fields before creating a post.');
      return;
    }

    const newPost: Post = {
      _id: '',
      title: this.title,
      content: this.content,
      username: this.username,
    };

    this.api.createPost(newPost).subscribe({
      next: () => {
        this.resetForm();
        this.getAllPosts();
        this.closeCreateModal();  // Close the modal after saving
      },
      error: (err) => console.error('Error creating post:', err),
    });
  }

  editPost(post: Post) {
    this._id = post._id || '';
    this.title = post.title;
    this.content = post.content;
    this.username = post.username;
    this.showEditModal = true;
  }

  updatePost() {
    if (!this.title || !this.content || !this.username) {
      alert('Please fill in all fields before updating the post.');
      return;
    }

    const updatedPost: Post = {
      _id: this._id,
      title: this.title,
      content: this.content,
      username: this.username,
    };

    this.api.updatePost(updatedPost).subscribe({
      next: () => {
        this.resetForm();
        this.getAllPosts();
        this.closeEditModal();  // Close the modal after updating
      },
      error: (err) => console.error('Error updating post:', err),
    });
  }

  // Modal control methods
  openCreateModal() {
    this.resetForm();
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }
}
