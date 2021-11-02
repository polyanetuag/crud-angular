import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "Http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }
  //interação com o backend - criação dos produtos
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

  // leitura dos produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // busca de produtos por id
  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/ ${id}`;
    return this.http.get<Product>(url);
  }

  //atualizar produtos
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/ ${product.id}`;
    return this.http.put<Product>(url, product);
  }

  //deletar produtos
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/ ${id}`;
    return this.http.delete<Product>(url);
  }
}
