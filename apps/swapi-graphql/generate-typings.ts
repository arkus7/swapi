import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(__dirname, 'src/**/*.graphql')],
  path: join(__dirname, 'src/graphql.ts'),
  outputAs: 'class',
});
