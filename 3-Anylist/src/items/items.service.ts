import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';



@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository( Item )
    private readonly itemsRespository: Repository<Item>
  ) { }

  async create( createItemInput: CreateItemInput ): Promise<Item> {
    const newItem = this.itemsRespository.create( createItemInput );
    return await this.itemsRespository.save( newItem );
  };

  async findAll(): Promise<Item[]> {
    return this.itemsRespository.find();
  }

  async findOne( id: string ): Promise<Item> {
    const item = await this.itemsRespository.findOneBy( { id } );
    if ( !item ) throw new NotFoundException( `Item with id: ${ id } not found.` );
    return item;
  }

  async update( id: string, updateItemInput: UpdateItemInput ): Promise<Item> {
    const item = await this.itemsRespository.preload( updateItemInput );

    if ( !item ) throw new NotFoundException( `Item with id: ${ id } not found.` );

    return this.itemsRespository.save( item );
  }

  async remove( id: string ): Promise<Item> {
    const item = await this.findOne( id );
    await this.itemsRespository.remove( item );
    return { ...item, id };
  }

}
