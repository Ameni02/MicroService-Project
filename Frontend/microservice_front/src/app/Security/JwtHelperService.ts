import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class JwtHelperService {
  getRawToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getDecodedToken(): any {
    const token = this.getRawToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserRoles(): string[] {
    const token = this.getDecodedToken();
    if (!token) return [];

    return [
      ...(token.realm_access?.roles || []),
      ...(token.resource_access?.['codingfactory-rest-api']?.roles || []),
      ...(token.roles || [])
    ];
  }

  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('client_admin') || roles.includes('admin');
  }

  isUser(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('client_user') || roles.includes('user');
  }

  hasUserOrAdminRole(): boolean {
    return this.isUser() || this.isAdmin();
  }

  isAuthenticated(): boolean {
    return !!this.getRawToken();
  }

  hasAnyRole(requiredRoles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return requiredRoles.some(role =>
      userRoles.includes(role) ||
      (role === 'admin' && this.isAdmin()) ||
      (role === 'user' && this.isUser())
    );
  }
}
