import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../Services_groupe/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  editingCategory: Category | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load categories';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.loading = true;
      const categoryData = this.categoryForm.value;

      if (this.editingCategory?.id) {
        this.categoryService.updateCategory(this.editingCategory.id, categoryData).subscribe({
          next: () => {
            this.loadCategories();
            this.resetForm();
          },
          error: (err) => {
            this.error = 'Failed to update category';
            this.loading = false;
          }
        });
      } else {
        this.categoryService.createCategory(categoryData).subscribe({
          next: () => {
            this.loadCategories();
            this.resetForm();
          },
          error: (err) => {
            this.error = 'Failed to create category';
            this.loading = false;
          }
        });
      }
    }
  }

  editCategory(category: Category): void {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  deleteCategory(categoryId: number | undefined): void {
    if (categoryId && confirm('Are you sure you want to delete this category?')) {
      this.loading = true;
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (err) => {
          this.error = 'Failed to delete category';
          this.loading = false;
        }
      });
    }
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.editingCategory = null;
    this.loading = false;
    this.error = null;
  }
}
