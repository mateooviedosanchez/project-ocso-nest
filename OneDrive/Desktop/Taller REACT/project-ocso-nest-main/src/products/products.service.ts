import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Provider } from 'src/providers/entities/provider.entity';

@Injectable()
export class ProductsService {
  constructor(    
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  private products: CreateProductDto[] = [];

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto as DeepPartial<Product>);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,
    })
    if (!product) throw new NotFoundException()
      return product
  }

  findByProvider(id: string) {
    return this.productRepository.findBy({
      provider: {
        providerId: id,
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
      provider: updateProductDto.provider as DeepPartial<Provider> | undefined
    })

    if (!productToUpdate) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (!productToUpdate) throw new NotFoundException()
      this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    return this.productRepository.delete({
      productId: id,
    });
    return {
      message: `Producto con id ${id} eliminado`
    }
  }
}
