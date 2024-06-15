import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';


@Resolver()
export class HelloWorldResolver {


  @Query( () => String,
    {
      description: 'Hola mundo es lo que retorna.',
      name: 'hello'
    }
  )
  helloWorld(): string {
    return 'Hola mundo';
  }


  @Query( () => Float, {
    name: 'randomNumber'
  } )
  getRandomNumber(): number {
    return Math.random() * 100;
  }


  @Query( () => Int, {
    name: 'randomFromZeroTo',
    description: 'From zerto to argument To (default 6)'
  } )
  getRandomFromZeroTo(
    @Args( 'to', {
      nullable: true,
      type: () => Int
    } ) to: number = 6,
  ): number {
    return Math.floor( Math.random() * to );
  }




}
