import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private items: any[] = [];
  private itemsPerPage: number = 3;
  private currentPage: number = 1;
  constructor() { }

  initialize(items: any[], itemsPerPage: number): void {
    this.items = items;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  getCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
      this.currentPage = pageNumber;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

}
