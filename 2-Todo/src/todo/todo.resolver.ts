import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { StatusArgs, CreateTodoInput, UpdateTodoInput } from './dto';
import { AggregationsType } from './types/aggregations.type';



@Resolver( () => Todo )
export class TodoResolver {


  constructor(
    private readonly todoService: TodoService
  ) { }


  @Query( () => [ Todo ], {
    name: 'todos'
  } )
  findAll(
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll( statusArgs );
  }


  @Query( () => Todo, {
    name: 'todo'
  } )
  findOne( @Args( 'id', {
    nullable: false,
    type: () => Int
  } ) id: number = 0 ) {
    return this.todoService.findOne( id );
  }


  @Mutation( () => Todo, {
    name: 'createTodo'
  } )
  createTodo(
    @Args( 'createTodoInput' ) createTodoInput: CreateTodoInput
  ) {
    console.log( { createTodoInput } );
    return this.todoService.create( createTodoInput );
  }


  @Mutation( () => Todo, {
    name: 'updateTodo'
  } )
  updateTodo(
    @Args( 'updateTodoInput' ) updateTodoInput: UpdateTodoInput
  ) {
    return this.todoService.update( updateTodoInput );
  }


  @Mutation( () => Boolean )
  removeTodo(
    @Args( 'id', { type: () => Int } ) id: number
  ) {
    return this.todoService.delete( id );
  }

  @Query( () => Int, {
    name: 'totalTodos'
  } )
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query( () => Int, {
    name: 'pendingTodos'
  } )
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query( () => Int, {
    name: 'completedTodos'
  } )
  completedTodos(): number {
    return this.todoService.completedTodos;
  }


  @Query( () => AggregationsType )
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.completedTodos,
      total: this.todoService.totalTodos,
      totalTodosCompleted: this.todoService.totalTodos
    };
  };
}
