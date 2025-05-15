import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000/post';

  constructor(private http: HttpClient) {}

  // Get all posts
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  // Get a single post by ID
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  // Create a new post
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }

  // Update a post
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${post._id}`, post);
  }

  // Delete a post
  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.url}/${id}`);
  }
}
