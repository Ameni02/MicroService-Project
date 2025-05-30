/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ajouterAnnonce } from '../fn/rest-api/ajouter-annonce';
import { AjouterAnnonce$Params } from '../fn/rest-api/ajouter-annonce';
import { ajouterCategory } from '../fn/rest-api/ajouter-category';
import { AjouterCategory$Params } from '../fn/rest-api/ajouter-category';
import { Annonce } from '../models/annonce';
import { Category } from '../models/category';
import { getAnnoncesAujourdhui } from '../fn/rest-api/get-annonces-aujourdhui';
import { GetAnnoncesAujourdhui$Params } from '../fn/rest-api/get-annonces-aujourdhui';
import { getAnnoncesCetteSemaine } from '../fn/rest-api/get-annonces-cette-semaine';
import { GetAnnoncesCetteSemaine$Params } from '../fn/rest-api/get-annonces-cette-semaine';
import { modifierAnnonce } from '../fn/rest-api/modifier-annonce';
import { ModifierAnnonce$Params } from '../fn/rest-api/modifier-annonce';
import { modifierCategory } from '../fn/rest-api/modifier-category';
import { ModifierCategory$Params } from '../fn/rest-api/modifier-category';
import { obtenirAnnonceParId } from '../fn/rest-api/obtenir-annonce-par-id';
import { ObtenirAnnonceParId$Params } from '../fn/rest-api/obtenir-annonce-par-id';
import { obtenirCategoryParId } from '../fn/rest-api/obtenir-category-par-id';
import { ObtenirCategoryParId$Params } from '../fn/rest-api/obtenir-category-par-id';
import { obtenirToutesLesCategories } from '../fn/rest-api/obtenir-toutes-les-categories';
import { ObtenirToutesLesCategories$Params } from '../fn/rest-api/obtenir-toutes-les-categories';
import { rechercherAnnonces } from '../fn/rest-api/rechercher-annonces';
import { RechercherAnnonces$Params } from '../fn/rest-api/rechercher-annonces';
import { rejeterAnnonce } from '../fn/rest-api/rejeter-annonce';
import { RejeterAnnonce$Params } from '../fn/rest-api/rejeter-annonce';
import { supprimerAnnonce } from '../fn/rest-api/supprimer-annonce';
import { SupprimerAnnonce$Params } from '../fn/rest-api/supprimer-annonce';
import { supprimerCategory } from '../fn/rest-api/supprimer-category';
import { SupprimerCategory$Params } from '../fn/rest-api/supprimer-category';
import { testAdmin } from '../fn/rest-api/test-admin';
import { TestAdmin$Params } from '../fn/rest-api/test-admin';
import { validerAnnonce } from '../fn/rest-api/valider-annonce';
import { ValiderAnnonce$Params } from '../fn/rest-api/valider-annonce';

@Injectable({ providedIn: 'root' })
export class RestApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `obtenirCategoryParId()` */
  static readonly ObtenirCategoryParIdPath = '/api/categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenirCategoryParId()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenirCategoryParId$Response(params: ObtenirCategoryParId$Params, context?: HttpContext): Observable<StrictHttpResponse<Category>> {
    return obtenirCategoryParId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obtenirCategoryParId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenirCategoryParId(params: ObtenirCategoryParId$Params, context?: HttpContext): Observable<Category> {
    return this.obtenirCategoryParId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Category>): Category => r.body)
    );
  }

  /** Path part for operation `modifierCategory()` */
  static readonly ModifierCategoryPath = '/api/categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `modifierCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifierCategory$Response(params: ModifierCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Category>> {
    return modifierCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `modifierCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifierCategory(params: ModifierCategory$Params, context?: HttpContext): Observable<Category> {
    return this.modifierCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Category>): Category => r.body)
    );
  }

  /** Path part for operation `supprimerCategory()` */
  static readonly SupprimerCategoryPath = '/api/categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `supprimerCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  supprimerCategory$Response(params: SupprimerCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return supprimerCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `supprimerCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  supprimerCategory(params: SupprimerCategory$Params, context?: HttpContext): Observable<void> {
    return this.supprimerCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `obtenirAnnonceParId()` */
  static readonly ObtenirAnnonceParIdPath = '/api/annonces/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenirAnnonceParId()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenirAnnonceParId$Response(params: ObtenirAnnonceParId$Params, context?: HttpContext): Observable<StrictHttpResponse<Annonce>> {
    return obtenirAnnonceParId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obtenirAnnonceParId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenirAnnonceParId(params: ObtenirAnnonceParId$Params, context?: HttpContext): Observable<Annonce> {
    return this.obtenirAnnonceParId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Annonce>): Annonce => r.body)
    );
  }

  /** Path part for operation `modifierAnnonce()` */
  static readonly ModifierAnnoncePath = '/api/annonces/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `modifierAnnonce()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifierAnnonce$Response(params: ModifierAnnonce$Params, context?: HttpContext): Observable<StrictHttpResponse<Annonce>> {
    return modifierAnnonce(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `modifierAnnonce$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifierAnnonce(params: ModifierAnnonce$Params, context?: HttpContext): Observable<Annonce> {
    return this.modifierAnnonce$Response(params, context).pipe(
      map((r: StrictHttpResponse<Annonce>): Annonce => r.body)
    );
  }

  /** Path part for operation `supprimerAnnonce()` */
  static readonly SupprimerAnnoncePath = '/api/annonces/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `supprimerAnnonce()` instead.
   *
   * This method doesn't expect any request body.
   */
  supprimerAnnonce$Response(params: SupprimerAnnonce$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return supprimerAnnonce(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `supprimerAnnonce$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  supprimerAnnonce(params: SupprimerAnnonce$Params, context?: HttpContext): Observable<void> {
    return this.supprimerAnnonce$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `validerAnnonce()` */
  static readonly ValiderAnnoncePath = '/api/annonces/{id}/valider';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validerAnnonce()` instead.
   *
   * This method doesn't expect any request body.
   */
  validerAnnonce$Response(params: ValiderAnnonce$Params, context?: HttpContext): Observable<StrictHttpResponse<Annonce>> {
    return validerAnnonce(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `validerAnnonce$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  validerAnnonce(params: ValiderAnnonce$Params, context?: HttpContext): Observable<Annonce> {
    return this.validerAnnonce$Response(params, context).pipe(
      map((r: StrictHttpResponse<Annonce>): Annonce => r.body)
    );
  }

  /** Path part for operation `rejeterAnnonce()` */
  static readonly RejeterAnnoncePath = '/api/annonces/{id}/rejeter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rejeterAnnonce()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejeterAnnonce$Response(params: RejeterAnnonce$Params, context?: HttpContext): Observable<StrictHttpResponse<Annonce>> {
    return rejeterAnnonce(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rejeterAnnonce$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejeterAnnonce(params: RejeterAnnonce$Params, context?: HttpContext): Observable<Annonce> {
    return this.rejeterAnnonce$Response(params, context).pipe(
      map((r: StrictHttpResponse<Annonce>): Annonce => r.body)
    );
  }

  /** Path part for operation `obtenirToutesLesCategories()` */
  static readonly ObtenirToutesLesCategoriesPath = '/api/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenirToutesLesCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenirToutesLesCategories$Response(params?: ObtenirToutesLesCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Category>>> {
    return obtenirToutesLesCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obtenirToutesLesCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenirToutesLesCategories(params?: ObtenirToutesLesCategories$Params, context?: HttpContext): Observable<Array<Category>> {
    return this.obtenirToutesLesCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Category>>): Array<Category> => r.body)
    );
  }

  /** Path part for operation `ajouterCategory()` */
  static readonly AjouterCategoryPath = '/api/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ajouterCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ajouterCategory$Response(params: AjouterCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Category>> {
    return ajouterCategory(this.http, this.rootUrl, params, context);
  }


  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ajouterCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ajouterCategory(params: AjouterCategory$Params, context?: HttpContext): Observable<Category> {
    return this.ajouterCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Category>): Category => r.body)
    );
  }

  /** Path part for operation `ajouterAnnonce()` */
  static readonly AjouterAnnoncePath = '/api/annonces/new';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ajouterAnnonce()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ajouterAnnonce$Response(params: AjouterAnnonce$Params, context?: HttpContext): Observable<StrictHttpResponse<Annonce>> {
    return ajouterAnnonce(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ajouterAnnonce$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ajouterAnnonce(params: AjouterAnnonce$Params, context?: HttpContext): Observable<Annonce> {
    return this.ajouterAnnonce$Response(params, context).pipe(
      map((r: StrictHttpResponse<Annonce>): Annonce => r.body)
    );
  }

  /** Path part for operation `testAdmin()` */
  static readonly TestAdminPath = '/api/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `testAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  testAdmin$Response(params?: TestAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return testAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `testAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  testAdmin(params?: TestAdmin$Params, context?: HttpContext): Observable<string> {
    return this.testAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getAnnoncesCetteSemaine()` */
  static readonly GetAnnoncesCetteSemainePath = '/api/annonces/semaines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAnnoncesCetteSemaine()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAnnoncesCetteSemaine$Response(params?: GetAnnoncesCetteSemaine$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Annonce>>> {
    return getAnnoncesCetteSemaine(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAnnoncesCetteSemaine$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAnnoncesCetteSemaine(params?: GetAnnoncesCetteSemaine$Params, context?: HttpContext): Observable<Array<Annonce>> {
    return this.getAnnoncesCetteSemaine$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Annonce>>): Array<Annonce> => r.body)
    );
  }

  /** Path part for operation `rechercherAnnonces()` */
  static readonly RechercherAnnoncesPath = '/api/annonces/rechercher';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rechercherAnnonces()` instead.
   *
   * This method doesn't expect any request body.
   */
  rechercherAnnonces$Response(params?: RechercherAnnonces$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Annonce>>> {
    return rechercherAnnonces(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rechercherAnnonces$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rechercherAnnonces(params?: RechercherAnnonces$Params, context?: HttpContext): Observable<Annonce[]> {
    // Convert params to HttpParams or plain object
    const httpParams = this.convertToHttpParams(params);

    return this.http.get<Annonce[]>(
      `${this.rootUrl}${RestApiService.RechercherAnnoncesPath}`,
      {
        params: httpParams,
        context,
        responseType: 'json'
      }
    ).pipe(
      catchError(error => {
        if (error.error instanceof Blob) {
          return this.handleBlobError(error.error);
        }
        return throwError(() => error);
      })
    );
  }

  // Helper method to convert RechercherAnnonces$Params to HttpParams
  private convertToHttpParams(params?: RechercherAnnonces$Params): { [param: string]: string | number | boolean | readonly (string | number | boolean)[] } {
    if (!params) return {};

    // Convert the params to a format compatible with HttpClient
    const httpParams: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] } = {};

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key as keyof RechercherAnnonces$Params];
        if (value !== undefined && value !== null) {
          httpParams[key] = value as string | number | boolean;
        }
      }
    }

    return httpParams;
  }

  private handleBlobError(blob: Blob): Observable<Annonce[]> {
    return new Observable<Annonce[]>(observer => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const content = reader.result as string;
          const jsonResponse = JSON.parse(content);

          if (Array.isArray(jsonResponse)) {
            observer.next(jsonResponse);
            observer.complete();
          } else {
            observer.error(new Error('Unexpected response format'));
          }
        } catch (e) {
          observer.error(e);
        }
      };
      reader.onerror = () => observer.error(new Error('Failed to read Blob'));
      reader.readAsText(blob);
    });
  }
  /** Path part for operation `getAnnoncesAujourdhui()` */
  static readonly GetAnnoncesAujourdhuiPath = '/api/annonces/aujourdhui';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAnnoncesAujourdhui()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAnnoncesAujourdhui$Response(params?: GetAnnoncesAujourdhui$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Annonce>>> {
    return getAnnoncesAujourdhui(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAnnoncesAujourdhui$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAnnoncesAujourdhui(params?: GetAnnoncesAujourdhui$Params, context?: HttpContext): Observable<Array<Annonce>> {
    return this.getAnnoncesAujourdhui$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Annonce>>): Array<Annonce> => r.body)
    );
  }
  // Add this method to get all annonces
  static readonly ObtenirToutesLesAnnoncesPath = '/api/annonces';

  obtenirToutesLesAnnonces$Response(params?: any, context?: HttpContext): Observable<StrictHttpResponse<Array<Annonce>>> {
    return this.http.get(
      this.rootUrl + RestApiService.ObtenirToutesLesAnnoncesPath,
      {
        context,
        observe: 'response',
        responseType: 'json'
      }
    ).pipe(
      map((r: HttpResponse<any>) => r as StrictHttpResponse<Array<Annonce>>)
    );
  }

  obtenirToutesLesAnnonces(params?: any, context?: HttpContext): Observable<Array<Annonce>> {
    return this.obtenirToutesLesAnnonces$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Annonce>>) => r.body)
    );
  }

}
