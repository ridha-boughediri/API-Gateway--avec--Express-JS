import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController], // Contrôleur de catégorie
  providers: [CategoryService], // Service de catégorie
})
export class CategoryModule {}
