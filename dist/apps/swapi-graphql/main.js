/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = __webpack_require__(1);
const common_1 = __webpack_require__(5);
const core_1 = __webpack_require__(6);
const app_module_1 = __webpack_require__(7);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const port = process.env.PORT || app.get(config_service_1.ConfigService).graphqlPort;
    const logger = new common_1.Logger('Swapi GraphQL');
    app.useLogger(logger);
    await app.listen(port);
    logger.log(`Swapi GraphQL listening on port ${port}`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __webpack_require__(2);
const dotenv = __webpack_require__(3);
const fs = __webpack_require__(4);
class ConfigService {
    constructor(filePath) {
        console.log('TCL: ConfigService -> constructor -> filePath', filePath);
        console.log('TCL: ConfigService -> constructor -> fs.existsSync(filePath)', fs.existsSync(filePath));
        if (fs.existsSync(filePath)) {
            const config = dotenv.parse(fs.readFileSync(filePath));
            this.envConfig = this.validateInput(config);
        }
        else {
            this.envConfig = {};
        }
        console.log('TCL: ConfigService -> constructor -> envConfig', this.envConfig);
    }
    get(key) {
        console.log('TCL: ConfigService -> key', key);
        console.log('TCL: ConfigService -> process.env[key]', process.env[key]);
        console.log('TCL: ConfigService -> this.envConfig[key]', this.envConfig[key]);
        return process.env[key] || this.envConfig[key];
    }
    get mongoDbUri() {
        return this.get('MONGODB_URI');
    }
    get restPort() {
        return parseInt(this.get('REST_PORT'), 10);
    }
    get graphqlPort() {
        return parseInt(this.get('GRAPHQL_PORT'), 10);
    }
    get isDebug() {
        const env = this.get('NODE_ENV');
        return env === 'test' || env === 'development';
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test')
                .default('development'),
            GRAPHQL_PORT: Joi.number().default(3001),
            REST_PORT: Joi.number().default(3000),
            MONGODB_URI: Joi.string().required(),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}
exports.ConfigService = ConfigService;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_module_1 = __webpack_require__(8);
const config_service_1 = __webpack_require__(1);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(9);
const character_module_1 = __webpack_require__(10);
const date_scalar_1 = __webpack_require__(40);
const film_module_1 = __webpack_require__(42);
const location_module_1 = __webpack_require__(49);
const species_module_1 = __webpack_require__(52);
const vehicle_module_1 = __webpack_require__(61);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            film_module_1.FilmModule,
            character_module_1.CharacterModule,
            location_module_1.LocationModule,
            species_module_1.SpeciesModule,
            vehicle_module_1.VehicleModule,
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: (config) => {
                    return {
                        typePaths: ['./**/*.graphql'],
                        debug: config.isDebug,
                        playground: true,
                        introspection: true,
                    };
                },
            }),
        ],
        providers: [date_scalar_1.DateScalar],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const config_service_1 = __webpack_require__(1);
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    common_1.Module({
        providers: [
            {
                provide: config_service_1.ConfigService,
                useValue: new config_service_1.ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
            },
        ],
        exports: [config_service_1.ConfigService],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const characterData_module_1 = __webpack_require__(11);
const filmData_module_1 = __webpack_require__(27);
const locationData_module_1 = __webpack_require__(31);
const common_1 = __webpack_require__(5);
const character_resolvers_1 = __webpack_require__(38);
let CharacterModule = class CharacterModule {
};
CharacterModule = __decorate([
    common_1.Module({
        imports: [characterData_module_1.CharacterDataModule, filmData_module_1.FilmDataModule, locationData_module_1.LocationDataModule],
        providers: [character_resolvers_1.CharacterResolvers],
    })
], CharacterModule);
exports.CharacterModule = CharacterModule;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const characterData_providers_1 = __webpack_require__(15);
const characterData_service_1 = __webpack_require__(18);
let CharacterDataModule = class CharacterDataModule {
};
CharacterDataModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...characterData_providers_1.characterDataProviders,
            characterData_service_1.CharacterDataService,
        ],
        exports: [
            characterData_service_1.CharacterDataService,
        ],
    })
], CharacterDataModule);
exports.CharacterDataModule = CharacterDataModule;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const config_module_1 = __webpack_require__(8);
const database_providers_1 = __webpack_require__(13);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [config_module_1.ConfigModule],
        providers: [...database_providers_1.databaseProviders],
        exports: [...database_providers_1.databaseProviders],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(14);
const config_service_1 = __webpack_require__(1);
exports.DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION';
exports.databaseProviders = [
    {
        provide: exports.DATABASE_CONNECTION_TOKEN,
        useFactory: (config) => {
            const connectionUri = config.mongoDbUri;
            const connectionOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            return mongoose.connect(connectionUri, connectionOptions);
        },
        inject: [config_service_1.ConfigService],
    },
];


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(13);
const character_schema_1 = __webpack_require__(16);
exports.CHARACTER_MODEL_TOKEN = 'CHARACTER_MODEL';
exports.characterDataProviders = [
    {
        provide: exports.CHARACTER_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Character', character_schema_1.CharacterSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(14);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(17);
const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    pictureUrl: String,
    height: Number,
    mass: Number,
    hairColor: [String],
    skinColor: [String],
    eyeColor: [String],
    birthYear: String,
    gender: String,
    homeWorld: mongoose.Schema.Types.ObjectId,
    species: mongoose.Schema.Types.ObjectId,
    appearances: [mongoose.Schema.Types.ObjectId],
    vehicles: [mongoose.Schema.Types.ObjectId],
});
exports.CharacterSchema = CharacterSchema;
CharacterSchema.plugin(mongoose_cursor_pagination_plugin_1.MongoPaging.mongoosePlugin);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("mongoose-cursor-pagination-plugin");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const characterData_providers_1 = __webpack_require__(15);
const characterFindInput_dto_1 = __webpack_require__(19);
let CharacterDataService = class CharacterDataService {
    constructor(characterModel) {
        this.characterModel = characterModel;
    }
    async findAll(params = characterFindInput_dto_1.CharacterFindInputDto.default()) {
        const { paginate, filter } = params;
        const query = {};
        const { name, film, homeWorld } = filter;
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        if (film) {
            query.appearances = film;
        }
        if (homeWorld) {
            query.homeWorld = homeWorld;
        }
        const options = {
            query,
            limit: paginate.take,
            next: paginate.after,
            previous: paginate.before,
            sortAscending: paginate.ascending,
            paginatedField: paginate.sortBy,
        };
        console.log('TCL: CharacterDataService -> constructor -> options', options);
        return await this.characterModel.paginate(options);
    }
    async findById(id) {
        return await this.characterModel.findById(id).exec();
    }
    async findCharactersFromFilm(filmId) {
        return await this.characterModel.find({
            appearances: filmId,
        });
    }
};
CharacterDataService = __decorate([
    __param(0, common_1.Inject(characterData_providers_1.CHARACTER_MODEL_TOKEN)),
    __metadata("design:paramtypes", [Object])
], CharacterDataService);
exports.CharacterDataService = CharacterDataService;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__(20);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const characterPaginateInput_dto_1 = __webpack_require__(23);
const characterWhereInput_dto_1 = __webpack_require__(26);
class CharacterFindInputDto extends graphql_1.CharacterFindInput {
    static default() {
        return {
            paginate: {},
            filter: {},
        };
    }
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => characterPaginateInput_dto_1.CharacterPaginateInputDto),
    __metadata("design:type", characterPaginateInput_dto_1.CharacterPaginateInputDto)
], CharacterFindInputDto.prototype, "paginate", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => characterWhereInput_dto_1.CharacterWhereInputDto),
    __metadata("design:type", characterWhereInput_dto_1.CharacterWhereInputDto)
], CharacterFindInputDto.prototype, "filter", void 0);
exports.CharacterFindInputDto = CharacterFindInputDto;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CharacterFindInput {
}
exports.CharacterFindInput = CharacterFindInput;
class CharacterWhereInput {
}
exports.CharacterWhereInput = CharacterWhereInput;
class CreateFilmInput {
}
exports.CreateFilmInput = CreateFilmInput;
class FilmFindInput {
}
exports.FilmFindInput = FilmFindInput;
class FilmWhereInput {
}
exports.FilmWhereInput = FilmWhereInput;
class LocationFindInput {
}
exports.LocationFindInput = LocationFindInput;
class LocationWhereInput {
}
exports.LocationWhereInput = LocationWhereInput;
class PaginateOptionsInput {
}
exports.PaginateOptionsInput = PaginateOptionsInput;
class SpeciesFindInput {
}
exports.SpeciesFindInput = SpeciesFindInput;
class SpeciesWhereInput {
}
exports.SpeciesWhereInput = SpeciesWhereInput;
class VehicleFindInput {
}
exports.VehicleFindInput = VehicleFindInput;
class VehicleWhereInput {
}
exports.VehicleWhereInput = VehicleWhereInput;
class Character {
}
exports.Character = Character;
class Film {
}
exports.Film = Film;
class Location {
}
exports.Location = Location;
class IMutation {
}
exports.IMutation = IMutation;
class PaginatedCharacters {
}
exports.PaginatedCharacters = PaginatedCharacters;
class PaginatedFilms {
}
exports.PaginatedFilms = PaginatedFilms;
class PaginatedLocations {
}
exports.PaginatedLocations = PaginatedLocations;
class PaginatedSpecies {
}
exports.PaginatedSpecies = PaginatedSpecies;
class PaginatedVehicles {
}
exports.PaginatedVehicles = PaginatedVehicles;
class IQuery {
}
exports.IQuery = IQuery;
class Species {
}
exports.Species = Species;
class Vehicle {
}
exports.Vehicle = Vehicle;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateInput_dto_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let CharacterPaginateInputDto = class CharacterPaginateInputDto extends paginateInput_dto_1.PaginateInputDto {
};
__decorate([
    class_validator_1.IsIn(['id', 'name']),
    __metadata("design:type", String)
], CharacterPaginateInputDto.prototype, "sortBy", void 0);
CharacterPaginateInputDto = __decorate([
    type_graphql_1.ArgsType()
], CharacterPaginateInputDto);
exports.CharacterPaginateInputDto = CharacterPaginateInputDto;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
class PaginateInputDto {
}
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(100),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PaginateInputDto.prototype, "take", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PaginateInputDto.prototype, "after", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PaginateInputDto.prototype, "before", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PaginateInputDto.prototype, "sortBy", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    class_transformer_1.Type(() => Boolean),
    __metadata("design:type", Boolean)
], PaginateInputDto.prototype, "ascending", void 0);
exports.PaginateInputDto = PaginateInputDto;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("type-graphql");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let CharacterWhereInputDto = class CharacterWhereInputDto extends graphql_1.CharacterWhereInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CharacterWhereInputDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], CharacterWhereInputDto.prototype, "film", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], CharacterWhereInputDto.prototype, "homeWorld", void 0);
CharacterWhereInputDto = __decorate([
    type_graphql_1.ArgsType()
], CharacterWhereInputDto);
exports.CharacterWhereInputDto = CharacterWhereInputDto;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const filmData_providers_1 = __webpack_require__(28);
const filmData_service_1 = __webpack_require__(30);
let FilmDataModule = class FilmDataModule {
};
FilmDataModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...filmData_providers_1.filmDataProviders,
            filmData_service_1.FilmDataService,
        ],
        exports: [
            filmData_service_1.FilmDataService,
        ],
    })
], FilmDataModule);
exports.FilmDataModule = FilmDataModule;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(13);
const film_schema_1 = __webpack_require__(29);
exports.FILM_MODEL_TOKEN = 'FILM_MODEL';
exports.filmDataProviders = [
    {
        provide: exports.FILM_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Film', film_schema_1.FilmSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(14);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(17);
const FilmSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    episodeNumber: { type: Number, required: false, sparse: true },
    openingCrawl: String,
    directors: [String],
    producers: [String],
    releaseDate: Date,
    runTime: Number,
    budget: Number,
    posterUrl: String,
    precededBy: mongoose.Schema.Types.ObjectId,
    followedBy: mongoose.Schema.Types.ObjectId,
});
exports.FilmSchema = FilmSchema;
FilmSchema.plugin(mongoose_cursor_pagination_plugin_1.MongoPaging.mongoosePlugin);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const filmData_providers_1 = __webpack_require__(28);
let FilmDataService = class FilmDataService {
    constructor(filmModel) {
        this.filmModel = filmModel;
    }
    async create(createFilmDto) {
        const createdFilm = new this.filmModel(createFilmDto);
        return await createdFilm.save();
    }
    async findAll(params = { paginate: {}, filter: {} }) {
        const { paginate, filter } = params;
        console.log('TCL: FilmDataService -> constructor -> paginate', paginate);
        const query = {};
        const { title, episodeNumber } = filter;
        if (title) {
            query.title = {
                $regex: title,
                $options: 'i',
            };
        }
        if (episodeNumber) {
            query.episodeNumber = episodeNumber;
        }
        const options = {
            query,
            limit: paginate.take,
            next: paginate.after,
            previous: paginate.before,
            sortAscending: paginate.ascending,
            paginatedField: paginate.sortBy,
        };
        console.log('TCL: FilmDataService -> constructor -> options', options);
        const response = await this.filmModel.paginate(options);
        return response;
    }
    async findById(id) {
        return await this.filmModel.findById(id).exec();
    }
    async findByEpisodeNumber(episodeNumber) {
        return await this.filmModel.findOne({ episodeNumber }).exec();
    }
};
FilmDataService = __decorate([
    __param(0, common_1.Inject(filmData_providers_1.FILM_MODEL_TOKEN)),
    __metadata("design:paramtypes", [Object])
], FilmDataService);
exports.FilmDataService = FilmDataService;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const locationData_providers_1 = __webpack_require__(32);
const locationData_service_1 = __webpack_require__(34);
let LocationDataModule = class LocationDataModule {
};
LocationDataModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...locationData_providers_1.locationDataProviders,
            locationData_service_1.LocationDataService,
        ],
        exports: [
            locationData_service_1.LocationDataService,
        ],
    })
], LocationDataModule);
exports.LocationDataModule = LocationDataModule;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(13);
const location_schema_1 = __webpack_require__(33);
exports.LOCATION_MODEL_TOKEN = 'LOCATION_MODEL';
exports.locationDataProviders = [
    {
        provide: exports.LOCATION_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Location', location_schema_1.LocationSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(14);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(17);
const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    pictureUrl: String,
    appearances: [mongoose.Schema.Types.ObjectId],
    climate: [String],
    terrain: [String],
});
exports.LocationSchema = LocationSchema;
LocationSchema.plugin(mongoose_cursor_pagination_plugin_1.MongoPaging.mongoosePlugin);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const locationFindInput_dto_1 = __webpack_require__(35);
const locationData_providers_1 = __webpack_require__(32);
let LocationDataService = class LocationDataService {
    constructor(locationModel) {
        this.locationModel = locationModel;
    }
    async findAll(params = locationFindInput_dto_1.LocationFindInputDto.default()) {
        const { paginate, filter } = params;
        const query = {};
        const { name, terrain, climate, film } = filter;
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        if (terrain) {
            query.terrain = {
                $regex: terrain,
                $options: 'i',
            };
        }
        if (climate) {
            query.climate = {
                $regex: climate,
                $options: 'i',
            };
        }
        if (film) {
            query.appearances = film;
        }
        const options = {
            query,
            limit: paginate.take,
            next: paginate.after,
            previous: paginate.before,
            sortAscending: paginate.ascending,
            paginatedField: paginate.sortBy,
        };
        console.log('TCL: LocationDataService -> constructor -> options', options);
        const response = await this.locationModel.paginate(options);
        return response;
    }
    async findById(id) {
        return await this.locationModel.findById(id).exec();
    }
    async findLocationsFromFilm(filmId) {
        return await this.locationModel.find({
            appearances: filmId,
        });
    }
};
LocationDataService = __decorate([
    __param(0, common_1.Inject(locationData_providers_1.LOCATION_MODEL_TOKEN)),
    __metadata("design:paramtypes", [Object])
], LocationDataService);
exports.LocationDataService = LocationDataService;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const graphql_1 = __webpack_require__(20);
const locationPaginateInput_dto_1 = __webpack_require__(36);
const locationWhereInput_dto_1 = __webpack_require__(37);
class LocationFindInputDto extends graphql_1.LocationFindInput {
    static default() {
        return {
            paginate: {},
            filter: {},
        };
    }
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => locationPaginateInput_dto_1.LocationPaginateInputDto),
    __metadata("design:type", locationPaginateInput_dto_1.LocationPaginateInputDto)
], LocationFindInputDto.prototype, "paginate", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => locationWhereInput_dto_1.LocationWhereInputDto),
    __metadata("design:type", locationWhereInput_dto_1.LocationWhereInputDto)
], LocationFindInputDto.prototype, "filter", void 0);
exports.LocationFindInputDto = LocationFindInputDto;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateInput_dto_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let LocationPaginateInputDto = class LocationPaginateInputDto extends paginateInput_dto_1.PaginateInputDto {
};
__decorate([
    class_validator_1.IsIn(['id', 'name']),
    __metadata("design:type", String)
], LocationPaginateInputDto.prototype, "sortBy", void 0);
LocationPaginateInputDto = __decorate([
    type_graphql_1.ArgsType()
], LocationPaginateInputDto);
exports.LocationPaginateInputDto = LocationPaginateInputDto;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let LocationWhereInputDto = class LocationWhereInputDto extends graphql_1.LocationWhereInput {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LocationWhereInputDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], LocationWhereInputDto.prototype, "film", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LocationWhereInputDto.prototype, "climate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LocationWhereInputDto.prototype, "terrain", void 0);
LocationWhereInputDto = __decorate([
    type_graphql_1.ArgsType()
], LocationWhereInputDto);
exports.LocationWhereInputDto = LocationWhereInputDto;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const characterData_service_1 = __webpack_require__(18);
const characterFindInput_dto_1 = __webpack_require__(19);
const filmData_service_1 = __webpack_require__(30);
const locationData_service_1 = __webpack_require__(34);
const graphql_1 = __webpack_require__(9);
const characterFindInput_args_1 = __webpack_require__(39);
let CharacterResolvers = class CharacterResolvers {
    constructor(characterDataService, filmDataService, locationDataService) {
        this.characterDataService = characterDataService;
        this.filmDataService = filmDataService;
        this.locationDataService = locationDataService;
    }
    async getAllCharacters(params) {
        const options = Object.assign(characterFindInput_dto_1.CharacterFindInputDto.default(), params);
        return await this.characterDataService.findAll(options);
    }
    async getById(id) {
        return this.characterDataService.findById(id);
    }
    async getCharactersFromFilm(filmId) {
        return this.characterDataService.findCharactersFromFilm(filmId);
    }
    async getFilmAppearances(character) {
        const { appearances } = character;
        return Promise.all(appearances.map(id => this.filmDataService.findById(id)));
    }
    async getHomeWorld(character) {
        const { homeWorld } = character;
        return await this.locationDataService.findById(homeWorld);
    }
};
__decorate([
    graphql_1.Query('characters'),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [characterFindInput_args_1.CharacterFindInputArgs]),
    __metadata("design:returntype", Promise)
], CharacterResolvers.prototype, "getAllCharacters", null);
__decorate([
    graphql_1.Query('character'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacterResolvers.prototype, "getById", null);
__decorate([
    graphql_1.Query('charactersFromFilm'),
    __param(0, graphql_1.Args('filmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacterResolvers.prototype, "getCharactersFromFilm", null);
__decorate([
    graphql_1.ResolveProperty('appearances'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacterResolvers.prototype, "getFilmAppearances", null);
__decorate([
    graphql_1.ResolveProperty('homeWorld'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacterResolvers.prototype, "getHomeWorld", null);
CharacterResolvers = __decorate([
    graphql_1.Resolver('Character'),
    __metadata("design:paramtypes", [characterData_service_1.CharacterDataService,
        filmData_service_1.FilmDataService,
        locationData_service_1.LocationDataService])
], CharacterResolvers);
exports.CharacterResolvers = CharacterResolvers;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const characterPaginateInput_dto_1 = __webpack_require__(23);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let CharacterFindInputArgs = class CharacterFindInputArgs {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => characterPaginateInput_dto_1.CharacterPaginateInputDto),
    type_graphql_1.Field(() => characterPaginateInput_dto_1.CharacterPaginateInputDto),
    __metadata("design:type", characterPaginateInput_dto_1.CharacterPaginateInputDto)
], CharacterFindInputArgs.prototype, "paginate", void 0);
CharacterFindInputArgs = __decorate([
    type_graphql_1.InputType()
], CharacterFindInputArgs);
exports.CharacterFindInputArgs = CharacterFindInputArgs;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__(9);
const graphql_2 = __webpack_require__(41);
let DateScalar = class DateScalar {
    constructor() {
        this.description = 'Date custom scalar type';
    }
    parseValue(value) {
        return new Date(value);
    }
    serialize(value) {
        return value.toUTCString();
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    }
};
DateScalar = __decorate([
    graphql_1.Scalar('Date')
], DateScalar);
exports.DateScalar = DateScalar;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const filmData_module_1 = __webpack_require__(27);
const common_1 = __webpack_require__(5);
const film_resolvers_1 = __webpack_require__(43);
let FilmModule = class FilmModule {
};
FilmModule = __decorate([
    common_1.Module({
        imports: [filmData_module_1.FilmDataModule],
        providers: [film_resolvers_1.FilmResolvers],
    })
], FilmModule);
exports.FilmModule = FilmModule;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const createFilm_dto_1 = __webpack_require__(44);
const filmData_service_1 = __webpack_require__(30);
const graphql_1 = __webpack_require__(9);
const episodeNumber_args_1 = __webpack_require__(45);
const filmFindInput_args_1 = __webpack_require__(46);
let FilmResolvers = class FilmResolvers {
    constructor(filmDataService) {
        this.filmDataService = filmDataService;
    }
    async getAllFilms(params) {
        const options = Object.assign({ paginate: {}, filter: {} }, params);
        return await this.filmDataService.findAll(options);
    }
    async getById(id) {
        return this.filmDataService.findById(id);
    }
    async getByEpisode(args) {
        return this.filmDataService.findByEpisodeNumber(args.episodeNumber);
    }
    async getFollowedBy(film) {
        return this.filmDataService.findById(film.followedBy);
    }
    async getPrecededBy(film) {
        return this.filmDataService.findById(film.precededBy);
    }
    async createFilm(filmData) {
        return this.filmDataService.create(filmData);
    }
};
__decorate([
    graphql_1.Query('films'),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filmFindInput_args_1.FilmFindInputArgs]),
    __metadata("design:returntype", Promise)
], FilmResolvers.prototype, "getAllFilms", null);
__decorate([
    graphql_1.Query('film'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilmResolvers.prototype, "getById", null);
__decorate([
    graphql_1.Query('filmByEpisode'),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [episodeNumber_args_1.EpisodeNumberArgs]),
    __metadata("design:returntype", Promise)
], FilmResolvers.prototype, "getByEpisode", null);
__decorate([
    graphql_1.ResolveProperty('followedBy'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilmResolvers.prototype, "getFollowedBy", null);
__decorate([
    graphql_1.ResolveProperty('precededBy'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilmResolvers.prototype, "getPrecededBy", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('filmData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFilm_dto_1.CreateFilmDto]),
    __metadata("design:returntype", Promise)
], FilmResolvers.prototype, "createFilm", null);
FilmResolvers = __decorate([
    graphql_1.Resolver('Film'),
    __metadata("design:paramtypes", [filmData_service_1.FilmDataService])
], FilmResolvers);
exports.FilmResolvers = FilmResolvers;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(22);
class CreateFilmDto extends graphql_1.CreateFilmInput {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "title", void 0);
__decorate([
    class_validator_1.Min(0),
    common_1.Optional(),
    __metadata("design:type", Number)
], CreateFilmDto.prototype, "episodeNumber", void 0);
exports.CreateFilmDto = CreateFilmDto;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
class EpisodeNumberArgs {
}
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], EpisodeNumberArgs.prototype, "episodeNumber", void 0);
exports.EpisodeNumberArgs = EpisodeNumberArgs;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const filmPaginateInput_dto_1 = __webpack_require__(47);
const filmWhereInput_dto_1 = __webpack_require__(48);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let FilmFindInputArgs = class FilmFindInputArgs {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => filmPaginateInput_dto_1.FilmPaginateInputDto),
    type_graphql_1.Field(() => filmPaginateInput_dto_1.FilmPaginateInputDto),
    __metadata("design:type", filmPaginateInput_dto_1.FilmPaginateInputDto)
], FilmFindInputArgs.prototype, "paginate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => filmWhereInput_dto_1.FilmWhereInputDto),
    type_graphql_1.Field(() => filmWhereInput_dto_1.FilmWhereInputDto),
    __metadata("design:type", filmWhereInput_dto_1.FilmWhereInputDto)
], FilmFindInputArgs.prototype, "filter", void 0);
FilmFindInputArgs = __decorate([
    type_graphql_1.InputType()
], FilmFindInputArgs);
exports.FilmFindInputArgs = FilmFindInputArgs;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateInput_dto_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let FilmPaginateInputDto = class FilmPaginateInputDto extends paginateInput_dto_1.PaginateInputDto {
};
__decorate([
    class_validator_1.IsIn(['id', 'episodeNumber', 'title', 'releaseDate']),
    __metadata("design:type", String)
], FilmPaginateInputDto.prototype, "sortBy", void 0);
FilmPaginateInputDto = __decorate([
    type_graphql_1.ArgsType()
], FilmPaginateInputDto);
exports.FilmPaginateInputDto = FilmPaginateInputDto;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__(20);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let FilmWhereInputDto = class FilmWhereInputDto extends graphql_1.FilmWhereInput {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(1),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], FilmWhereInputDto.prototype, "episodeNumber", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], FilmWhereInputDto.prototype, "title", void 0);
FilmWhereInputDto = __decorate([
    type_graphql_1.ArgsType()
], FilmWhereInputDto);
exports.FilmWhereInputDto = FilmWhereInputDto;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const filmData_module_1 = __webpack_require__(27);
const locationData_module_1 = __webpack_require__(31);
const common_1 = __webpack_require__(5);
const location_resolvers_1 = __webpack_require__(50);
let LocationModule = class LocationModule {
};
LocationModule = __decorate([
    common_1.Module({
        imports: [locationData_module_1.LocationDataModule, filmData_module_1.FilmDataModule],
        providers: [location_resolvers_1.LocationResolvers],
    })
], LocationModule);
exports.LocationModule = LocationModule;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const filmData_service_1 = __webpack_require__(30);
const locationFindInput_dto_1 = __webpack_require__(35);
const locationData_service_1 = __webpack_require__(34);
const graphql_1 = __webpack_require__(9);
const locationFindInput_args_1 = __webpack_require__(51);
let LocationResolvers = class LocationResolvers {
    constructor(locationDataService, filmDataService) {
        this.locationDataService = locationDataService;
        this.filmDataService = filmDataService;
    }
    async getAllCharacters(params) {
        const options = Object.assign(locationFindInput_dto_1.LocationFindInputDto.default(), params);
        return await this.locationDataService.findAll(options);
    }
    async getById(id) {
        return this.locationDataService.findById(id);
    }
    async getLocationsFromFilm(filmId) {
        return this.locationDataService.findLocationsFromFilm(filmId);
    }
    async getFilmAppearances(location) {
        const { appearances } = location;
        return Promise.all(appearances.map(id => this.filmDataService.findById(id)));
    }
};
__decorate([
    graphql_1.Query('locations'),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [locationFindInput_args_1.LocationFindInputArgs]),
    __metadata("design:returntype", Promise)
], LocationResolvers.prototype, "getAllCharacters", null);
__decorate([
    graphql_1.Query('location'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationResolvers.prototype, "getById", null);
__decorate([
    graphql_1.Query('locationsFromFilm'),
    __param(0, graphql_1.Args('filmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationResolvers.prototype, "getLocationsFromFilm", null);
__decorate([
    graphql_1.ResolveProperty('appearances'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationResolvers.prototype, "getFilmAppearances", null);
LocationResolvers = __decorate([
    graphql_1.Resolver('Location'),
    __metadata("design:paramtypes", [locationData_service_1.LocationDataService,
        filmData_service_1.FilmDataService])
], LocationResolvers);
exports.LocationResolvers = LocationResolvers;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const locationPaginateInput_dto_1 = __webpack_require__(36);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let LocationFindInputArgs = class LocationFindInputArgs {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => locationPaginateInput_dto_1.LocationPaginateInputDto),
    type_graphql_1.Field(() => locationPaginateInput_dto_1.LocationPaginateInputDto),
    __metadata("design:type", locationPaginateInput_dto_1.LocationPaginateInputDto)
], LocationFindInputArgs.prototype, "paginate", void 0);
LocationFindInputArgs = __decorate([
    type_graphql_1.InputType()
], LocationFindInputArgs);
exports.LocationFindInputArgs = LocationFindInputArgs;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const speciesData_module_1 = __webpack_require__(53);
const common_1 = __webpack_require__(5);
const species_resolvers_1 = __webpack_require__(59);
let SpeciesModule = class SpeciesModule {
};
SpeciesModule = __decorate([
    common_1.Module({
        imports: [speciesData_module_1.SpeciesDataModule],
        providers: [species_resolvers_1.SpeciesResolvers],
    })
], SpeciesModule);
exports.SpeciesModule = SpeciesModule;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const speciesData_providers_1 = __webpack_require__(54);
const speciesData_service_1 = __webpack_require__(56);
let SpeciesDataModule = class SpeciesDataModule {
};
SpeciesDataModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...speciesData_providers_1.speciesDataProviders,
            speciesData_service_1.SpeciesDataService,
        ],
        exports: [
            speciesData_service_1.SpeciesDataService,
        ],
    })
], SpeciesDataModule);
exports.SpeciesDataModule = SpeciesDataModule;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(13);
const species_schema_1 = __webpack_require__(55);
exports.SPECIES_MODEL_TOKEN = 'SPECIES_MODEL';
exports.speciesDataProviders = [
    {
        provide: exports.SPECIES_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Species', species_schema_1.SpeciesSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(14);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(17);
const SpeciesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});
exports.SpeciesSchema = SpeciesSchema;
SpeciesSchema.plugin(mongoose_cursor_pagination_plugin_1.MongoPaging.mongoosePlugin);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const speciesFindInput_dto_1 = __webpack_require__(57);
const speciesData_providers_1 = __webpack_require__(54);
let SpeciesDataService = class SpeciesDataService {
    constructor(speciesModel) {
        this.speciesModel = speciesModel;
    }
    async findAll(params = speciesFindInput_dto_1.SpeciesFindInputDto.default()) {
        const { paginate, filter } = params;
        const query = {};
        const { name } = filter;
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        const options = {
            query,
            limit: paginate.take,
            next: paginate.after,
            previous: paginate.before,
            sortAscending: paginate.ascending,
            paginatedField: paginate.sortBy,
        };
        console.log('TCL: SpeciesDataService -> constructor -> options', options);
        const response = await this.speciesModel.paginate(options);
        return response;
    }
    async findById(id) {
        return await this.speciesModel.findById(id).exec();
    }
};
SpeciesDataService = __decorate([
    __param(0, common_1.Inject(speciesData_providers_1.SPECIES_MODEL_TOKEN)),
    __metadata("design:paramtypes", [Object])
], SpeciesDataService);
exports.SpeciesDataService = SpeciesDataService;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const graphql_1 = __webpack_require__(20);
const speciesPaginateInput_dto_1 = __webpack_require__(58);
class SpeciesFindInputDto extends graphql_1.SpeciesFindInput {
    static default() {
        return {
            paginate: {},
            filter: {},
        };
    }
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => speciesPaginateInput_dto_1.SpeciesPaginateInputDto),
    __metadata("design:type", speciesPaginateInput_dto_1.SpeciesPaginateInputDto)
], SpeciesFindInputDto.prototype, "paginate", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => graphql_1.SpeciesWhereInput),
    __metadata("design:type", graphql_1.SpeciesWhereInput)
], SpeciesFindInputDto.prototype, "filter", void 0);
exports.SpeciesFindInputDto = SpeciesFindInputDto;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateInput_dto_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let SpeciesPaginateInputDto = class SpeciesPaginateInputDto extends paginateInput_dto_1.PaginateInputDto {
};
__decorate([
    class_validator_1.IsIn(['id', 'name']),
    __metadata("design:type", String)
], SpeciesPaginateInputDto.prototype, "sortBy", void 0);
SpeciesPaginateInputDto = __decorate([
    type_graphql_1.ArgsType()
], SpeciesPaginateInputDto);
exports.SpeciesPaginateInputDto = SpeciesPaginateInputDto;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const speciesFindInput_dto_1 = __webpack_require__(57);
const speciesData_service_1 = __webpack_require__(56);
const graphql_1 = __webpack_require__(9);
const speciesFindInput_args_1 = __webpack_require__(60);
let SpeciesResolvers = class SpeciesResolvers {
    constructor(speciesDataService) {
        this.speciesDataService = speciesDataService;
    }
    async getAllSpecies(params) {
        const options = Object.assign(speciesFindInput_dto_1.SpeciesFindInputDto.default(), params);
        return await this.speciesDataService.findAll(options);
    }
    async getById(id) {
        return this.speciesDataService.findById(id);
    }
};
__decorate([
    graphql_1.Query('allSpecies'),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [speciesFindInput_args_1.SpeciesFindInputArgs]),
    __metadata("design:returntype", Promise)
], SpeciesResolvers.prototype, "getAllSpecies", null);
__decorate([
    graphql_1.Query('species'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpeciesResolvers.prototype, "getById", null);
SpeciesResolvers = __decorate([
    graphql_1.Resolver('Species'),
    __metadata("design:paramtypes", [speciesData_service_1.SpeciesDataService])
], SpeciesResolvers);
exports.SpeciesResolvers = SpeciesResolvers;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const speciesPaginateInput_dto_1 = __webpack_require__(58);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let SpeciesFindInputArgs = class SpeciesFindInputArgs {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => speciesPaginateInput_dto_1.SpeciesPaginateInputDto),
    type_graphql_1.Field(() => speciesPaginateInput_dto_1.SpeciesPaginateInputDto),
    __metadata("design:type", speciesPaginateInput_dto_1.SpeciesPaginateInputDto)
], SpeciesFindInputArgs.prototype, "paginate", void 0);
SpeciesFindInputArgs = __decorate([
    type_graphql_1.InputType()
], SpeciesFindInputArgs);
exports.SpeciesFindInputArgs = SpeciesFindInputArgs;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const filmData_module_1 = __webpack_require__(27);
const locationData_module_1 = __webpack_require__(31);
const vehicleData_module_1 = __webpack_require__(62);
const common_1 = __webpack_require__(5);
const vehicle_resolvers_1 = __webpack_require__(68);
let VehicleModule = class VehicleModule {
};
VehicleModule = __decorate([
    common_1.Module({
        imports: [vehicleData_module_1.VehicleDataModule, locationData_module_1.LocationDataModule, filmData_module_1.FilmDataModule],
        providers: [vehicle_resolvers_1.VehicleResolvers],
    })
], VehicleModule);
exports.VehicleModule = VehicleModule;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const vehicleData_providers_1 = __webpack_require__(63);
const vehicleData_service_1 = __webpack_require__(65);
let VehicleDataModule = class VehicleDataModule {
};
VehicleDataModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [
            ...vehicleData_providers_1.vehicleDataProviders,
            vehicleData_service_1.VehicleDataService,
        ],
        exports: [
            vehicleData_service_1.VehicleDataService,
        ],
    })
], VehicleDataModule);
exports.VehicleDataModule = VehicleDataModule;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(13);
const vehicle_schema_1 = __webpack_require__(64);
exports.VEHICLE_MODEL_TOKEN = 'VEHICLE_MODEL';
exports.vehicleDataProviders = [
    {
        provide: exports.VEHICLE_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Vehicle', vehicle_schema_1.VehicleSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(14);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(17);
const VehicleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    pictureUrl: String,
    locations: [mongoose.Schema.Types.ObjectId],
    appearances: [mongoose.Schema.Types.ObjectId],
    dimensions: [String],
});
exports.VehicleSchema = VehicleSchema;
VehicleSchema.plugin(mongoose_cursor_pagination_plugin_1.MongoPaging.mongoosePlugin);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const vehicleFindInput_dto_1 = __webpack_require__(66);
const vehicleData_providers_1 = __webpack_require__(63);
let VehicleDataService = class VehicleDataService {
    constructor(vehicleModel) {
        this.vehicleModel = vehicleModel;
    }
    async findAll(params = vehicleFindInput_dto_1.VehicleFindInputDto.default()) {
        const { paginate, filter } = params;
        const query = {};
        const { name, film, location } = filter;
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        if (film) {
            query.appearances = film;
        }
        if (location) {
            query.locations = location;
        }
        const options = {
            query,
            limit: paginate.take,
            next: paginate.after,
            previous: paginate.before,
            sortAscending: paginate.ascending,
            paginatedField: paginate.sortBy,
        };
        console.log('TCL: VehicleDataService -> constructor -> options', options);
        const response = await this.vehicleModel.paginate(options);
        return response;
    }
    async findById(id) {
        return await this.vehicleModel.findById(id).exec();
    }
};
VehicleDataService = __decorate([
    __param(0, common_1.Inject(vehicleData_providers_1.VEHICLE_MODEL_TOKEN)),
    __metadata("design:paramtypes", [Object])
], VehicleDataService);
exports.VehicleDataService = VehicleDataService;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const graphql_1 = __webpack_require__(20);
const vehiclePaginateInput_dto_1 = __webpack_require__(67);
class VehicleFindInputDto extends graphql_1.VehicleFindInput {
    static default() {
        return {
            paginate: {},
            filter: {},
        };
    }
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => vehiclePaginateInput_dto_1.VehiclePaginateInputDto),
    __metadata("design:type", vehiclePaginateInput_dto_1.VehiclePaginateInputDto)
], VehicleFindInputDto.prototype, "paginate", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => graphql_1.VehicleWhereInput),
    __metadata("design:type", graphql_1.VehicleWhereInput)
], VehicleFindInputDto.prototype, "filter", void 0);
exports.VehicleFindInputDto = VehicleFindInputDto;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateInput_dto_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let VehiclePaginateInputDto = class VehiclePaginateInputDto extends paginateInput_dto_1.PaginateInputDto {
};
__decorate([
    class_validator_1.IsIn(['id', 'name']),
    __metadata("design:type", String)
], VehiclePaginateInputDto.prototype, "sortBy", void 0);
VehiclePaginateInputDto = __decorate([
    type_graphql_1.ArgsType()
], VehiclePaginateInputDto);
exports.VehiclePaginateInputDto = VehiclePaginateInputDto;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const filmData_service_1 = __webpack_require__(30);
const locationData_service_1 = __webpack_require__(34);
const vehicleFindInput_dto_1 = __webpack_require__(66);
const vehicleData_service_1 = __webpack_require__(65);
const graphql_1 = __webpack_require__(9);
const vehicleFindInput_args_1 = __webpack_require__(69);
let VehicleResolvers = class VehicleResolvers {
    constructor(vehicleDataService, locationDataService, filmDataService) {
        this.vehicleDataService = vehicleDataService;
        this.locationDataService = locationDataService;
        this.filmDataService = filmDataService;
    }
    async getAll(params) {
        const options = Object.assign(vehicleFindInput_dto_1.VehicleFindInputDto.default(), params);
        return await this.vehicleDataService.findAll(options);
    }
    async getById(id) {
        return this.vehicleDataService.findById(id);
    }
    async getLocations(vehicle) {
        const { locations } = vehicle;
        return Promise.all(locations.map(id => this.locationDataService.findById(id)));
    }
    async getFilms(vehicle) {
        const { appearances } = vehicle;
        return Promise.all(appearances.map(id => this.filmDataService.findById(id)));
    }
};
__decorate([
    graphql_1.Query('vehicles'),
    __param(0, graphql_1.Args('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicleFindInput_args_1.VehicleFindInputArgs]),
    __metadata("design:returntype", Promise)
], VehicleResolvers.prototype, "getAll", null);
__decorate([
    graphql_1.Query('vehicle'),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehicleResolvers.prototype, "getById", null);
__decorate([
    graphql_1.ResolveProperty('locations'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleResolvers.prototype, "getLocations", null);
__decorate([
    graphql_1.ResolveProperty('appearances'),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleResolvers.prototype, "getFilms", null);
VehicleResolvers = __decorate([
    graphql_1.Resolver('Vehicle'),
    __metadata("design:paramtypes", [vehicleData_service_1.VehicleDataService,
        locationData_service_1.LocationDataService,
        filmData_service_1.FilmDataService])
], VehicleResolvers);
exports.VehicleResolvers = VehicleResolvers;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicleFindInput_dto_1 = __webpack_require__(66);
const vehiclePaginateInput_dto_1 = __webpack_require__(67);
const vehicleWhereInput_dto_1 = __webpack_require__(70);
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let VehicleFindInputArgs = class VehicleFindInputArgs extends vehicleFindInput_dto_1.VehicleFindInputDto {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => vehiclePaginateInput_dto_1.VehiclePaginateInputDto),
    type_graphql_1.Field(() => vehiclePaginateInput_dto_1.VehiclePaginateInputDto),
    __metadata("design:type", vehiclePaginateInput_dto_1.VehiclePaginateInputDto)
], VehicleFindInputArgs.prototype, "paginate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => vehicleWhereInput_dto_1.VehicleWhereInputDto),
    type_graphql_1.Field(() => vehicleWhereInput_dto_1.VehicleWhereInputDto),
    __metadata("design:type", vehicleWhereInput_dto_1.VehicleWhereInputDto)
], VehicleFindInputArgs.prototype, "filter", void 0);
VehicleFindInputArgs = __decorate([
    type_graphql_1.InputType()
], VehicleFindInputArgs);
exports.VehicleFindInputArgs = VehicleFindInputArgs;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(22);
const type_graphql_1 = __webpack_require__(25);
let VehicleWhereInputDto = class VehicleWhereInputDto extends graphql_1.VehicleWhereInput {
};
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], VehicleWhereInputDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], VehicleWhereInputDto.prototype, "location", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], VehicleWhereInputDto.prototype, "film", void 0);
VehicleWhereInputDto = __decorate([
    type_graphql_1.ArgsType()
], VehicleWhereInputDto);
exports.VehicleWhereInputDto = VehicleWhereInputDto;


/***/ })
/******/ ]);