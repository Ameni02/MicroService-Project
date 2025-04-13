import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Thread } from '../models/thread.model';
import { Reply } from '../models/reply.model';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = '/forum/api/threads';
  private socket: Socket | null = null;
  
  // BehaviorSubjects for real-time updates
  private threadsSubject = new BehaviorSubject<Thread[]>([]);
  private currentThreadSubject = new BehaviorSubject<Thread | null>(null);
  
  // Observables that components can subscribe to
  public threads$ = this.threadsSubject.asObservable();
  public currentThread$ = this.currentThreadSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initSocket();
  }

  // Initialize Socket.IO connection
  private initSocket(): void {
    try {
      this.socket = io();
      
      // Listen for new threads
      this.socket.on('newThread', (thread: Thread) => {
        const currentThreads = this.threadsSubject.value;
        this.threadsSubject.next([thread, ...currentThreads]);
      });
      
      // Listen for new replies
      this.socket.on('newReply', (data: { threadId: number, reply: Reply }) => {
        const currentThread = this.currentThreadSubject.value;
        
        // If we're viewing the thread that got a new reply, update it
        if (currentThread && currentThread.id === data.threadId) {
          const updatedReplies = [...(currentThread.replies || []), data.reply];
          const updatedThread = { ...currentThread, replies: updatedReplies };
          this.currentThreadSubject.next(updatedThread);
        }
        
        // Also update the thread in the threads list
        const currentThreads = this.threadsSubject.value;
        const updatedThreads = currentThreads.map(thread => {
          if (thread.id === data.threadId) {
            const replies = thread.replies || [];
            return { ...thread, replies: [...replies, data.reply] };
          }
          return thread;
        });
        
        this.threadsSubject.next(updatedThreads);
      });
      
    } catch (error) {
      console.error('Socket.IO connection error:', error);
    }
  }

  // Get all threads
  getAllThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(this.apiUrl).pipe(
      tap(threads => this.threadsSubject.next(threads))
    );
  }

  // Get thread by ID
  getThreadById(id: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.apiUrl}/${id}`).pipe(
      tap(thread => this.currentThreadSubject.next(thread))
    );
  }

  // Create a new thread
  createThread(thread: Thread): Observable<Thread> {
    return this.http.post<Thread>(this.apiUrl, thread);
  }

  // Update a thread
  updateThread(id: number, thread: Thread): Observable<Thread> {
    return this.http.put<Thread>(`${this.apiUrl}/${id}`, thread);
  }

  // Delete a thread
  deleteThread(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Toggle thread lock status
  toggleThreadLock(id: number): Observable<Thread> {
    return this.http.patch<Thread>(`${this.apiUrl}/${id}/toggle-lock`, {});
  }

  // Get replies for a thread
  getRepliesByThreadId(threadId: number): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.apiUrl}/${threadId}/replies`);
  }

  // Create a new reply
  createReply(threadId: number, reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(`${this.apiUrl}/${threadId}/replies`, reply);
  }

  // Update a reply
  updateReply(threadId: number, replyId: number, reply: Reply): Observable<Reply> {
    return this.http.put<Reply>(`${this.apiUrl}/${threadId}/replies/${replyId}`, reply);
  }

  // Delete a reply
  deleteReply(threadId: number, replyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${threadId}/replies/${replyId}`);
  }
}
