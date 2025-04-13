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

  hasRole(role: string): boolean {
    const token = this.getDecodedToken();
    if (!token) return false;

    // Check all possible role locations
    const roles = [
      ...(token.realm_access?.roles || []),
      ...(token.resource_access?.['codingfactory-rest-api']?.roles || []),
      ...(token.resource_access?.account?.roles || []),
      ...(token.roles || [])
    ];

    console.log(`Checking for role ${role} in:`, roles);
    return roles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN') || this.hasRole('admin') || this.hasRole('client_admin');
  }

  isUser(): boolean {
    return this.hasRole('ROLE_USER') || this.hasRole('user') || this.hasRole('client_user');
  }

  getUserRoles(): string[] {
    const token = this.getDecodedToken();
    if (!token) return [];

    return [
      ...(token.realm_access?.roles || []),
      ...(token.resource_access?.['codingfactory-rest-api']?.roles || []),
      ...(token.resource_access?.account?.roles || []),
      ...(token.roles || [])
    ];
  }

  isAuthenticated(): boolean {
    return !!this.getRawToken();
  }
}
