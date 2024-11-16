import {
  Injectable,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoError } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { IResponseDto } from './base.interface';
import { BaseWhereDto } from './base-where.dto';

@Injectable()
@Catch(MongoError)
export class BaseService<T> implements ExceptionFilter {
  catch(exception: typeof MongoError, host: ArgumentsHost) {}

  constructor(@InjectModel('model') private model: Model<T>) {}

  PAGE: number = 1;
  PAGE_SIZE: number = 20;
  WHERE: BaseWhereDto;

  /**
   * Creates a new document in the database.
   *
   * @param {Partial<T>} data - The data to be used to create the document.
   * @return {Promise<T>} The newly created document.
   */
  async create(data: Partial<T>): Promise<any> {
    try {
      const doc = await new this.model(data);
      return doc.save();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        'Error occurred while fetching data from MongoDB.',
        e,
      );
    }
  }
  /**
   * Updates a document in the database with the given id and data.
   *
   * @param {string} id - The id of the document to update.
   * @param {Partial<T>} data - The data to update the document with.
   * @return {Promise<T | null>} A promise that resolves to the updated document, or null if not found.
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /**
   * Finds a single record by its id.
   *
   * @param {string} id - The id of the record to find.
   * @return {Promise<IResponseDto<T> | null>} A promise that resolves to the found record or null.
   */
  async findOne(id: string): Promise<IResponseDto<T> | null> {
    const result = await this.model.findById(id).exec();
    if (result) {
      // if we want to keep the result as find all as array
      const dataArray: T[] = [result]; // Convert the result to an array
      return {
        data: result,
        msg: 'SUCCESS',
      };
    } else {
      return {
        msg: 'SUCCESS',
      };
    }
  }

  /**
   * Finds a single record by its filter.
   *
   * @param key The property of the record to search by.
   * @param value The value to match against the specified key.
   * @return {Promise<IResponseDto<T> | null>} A promise that resolves to the found record or null.
   */
  async findByFilter(
    key: keyof T,
    value: any,
  ): Promise<IResponseDto<T> | null> {
    const results = await this.model
      .find({ [key]: value } as FilterQuery<T>)
      .exec();
    if (results) {
      return {
        data: results as T[],
        msg: 'SUCCESS',
      };
    } else {
      return {
        msg: 'SUCCESS',
      };
    }
  }

  /**
   * Finds a single record by its specific key.
   *
   * @param {keyof T} key - The name of the property of the Type T you want to search by. Since T represents the model you’re working with, the key can be any field of your model like 'username', 'email', et cetera.
   * @param {any} value - The value corresponding to the key you want to find. This can be any value that the key in your model can hold. So if your key (property of T) is 'username', then the value could be something like 'john_doe'.
   * @param {keyof T} orderBy - The property of the Type T by which you want to sort the results. It could be any field of your model, such as 'username', 'email', etc. T refers to the model you're working with.
   * @param {'asc' | 'desc'} order - It defines the order of the sort – ascending or descending. It defaults to 'asc' if not provided.
   * @return {Promise<IResponseDto<T> | null>} A promise that resolves to the found record or null.
   */
  async findAllByKey(
    key: keyof T,
    value: any,
    orderBy: keyof T,
    order: 'asc' | 'desc' = 'asc',
  ): Promise<IResponseDto<T[]> | null> {
    const sortOrder = order === 'asc' ? 1 : -1;
    const results = await this.model
      .find({ [key]: value } as FilterQuery<T>)
      .sort({ [orderBy as string]: sortOrder } as Record<string, -1 | 1>)
      .exec();
    if (results) {
      return {
        data: results as T[],
        msg: 'SUCCESS',
      };
    } else {
      return {
        msg: 'SUCCESS',
      };
    }
  }

  /**
   * Find all records that match the given conditions.
   *
   * @param {WhereDto} where - The conditions to match.
   * @return {Promise<IResponseDto<T>>} A promise that resolves to the response DTO.
   */
  async findAll(where: BaseWhereDto): Promise<IResponseDto<T>> {
    this.PAGE = where.page;
    this.WHERE = where;
    const { page, ...queryFilter } = where;
    delete where.page;

    const { sort, limit, ...filter } = queryFilter;
    const objectsCount = await this.model
      .countDocuments(filter as FilterQuery<T>)
      .exec();
    const pageCount = Math.ceil(objectsCount / this.PAGE_SIZE);
    let data;
    if (sort) {
      data = await this.model
        .find(filter as FilterQuery<T>)
        .sort(sort)
        .skip((this.PAGE - 1) * this.PAGE_SIZE)
        .limit(limit || this.PAGE_SIZE);
    } else {
      data = await this.model
        .find(filter as FilterQuery<T>)
        .skip((this.PAGE - 1) * this.PAGE_SIZE)
        .limit(limit || this.PAGE_SIZE);
    }

    const pagination = {
      page: this.PAGE,
      pageSize: this.PAGE_SIZE,
      pageCount: pageCount,
      total: objectsCount,
    };

    return {
      data: data,
      meta: {
        pagination: pagination,
      },
    };
  }

  /**
   * Removes a document from the model by its ID.
   *
   * @param {string} id - The ID of the document to remove.
   * @return {Promise<T | null>} A promise that resolves to the removed document,
   * or null if no document was found with the given ID.
   */
  async remove(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
