import { Injectable } from '@nestjs/common';
import { Category } from './category.interface';
import { CreateCategoryDto } from './CreateCategoryDto';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: number): Category {
    const categoryId = id.toString(); // Convertir l'ID en string
    return this.categories.find(category => category.id === categoryId);
  }

  create(categoryDto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: (this.categories.length + 1).toString(), // Convertir l'ID en string
      ...categoryDto,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, categoryDto: UpdateCategoryDto): Category {
    const categoryId = id.toString(); // Convertir l'ID en string
    const category = this.findOne(id);
    if (!category) {
      throw new Error('Category not found');
    }
    const updatedCategory = { ...category, ...categoryDto };
    this.categories = this.categories.map(cat =>
      cat.id === categoryId ? updatedCategory : cat,
    );
    return updatedCategory;
  }

  remove(id: number): Category {
    const categoryId = id.toString(); // Convertir l'ID en string
    const index = this.categories.findIndex(cat => cat.id === categoryId);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const removedCategory = this.categories.splice(index, 1)[0];
    return removedCategory;
  }
}
