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
    const port = process.env.PORT || app.get(config_service_1.ConfigService).restPort;
    const logger = new common_1.Logger('Swapi REST');
    app.useLogger(logger);
    await app.listen(port);
    logger.log(`Swapi REST listening on port ${port}`);
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
const common_1 = __webpack_require__(5);
const app_controller_1 = __webpack_require__(8);
const app_service_1 = __webpack_require__(9);
const character_module_1 = __webpack_require__(10);
const film_module_1 = __webpack_require__(29);
const location_module_1 = __webpack_require__(38);
const species_module_1 = __webpack_require__(47);
const vehicle_module_1 = __webpack_require__(55);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [film_module_1.FilmModule, character_module_1.CharacterModule, location_module_1.LocationModule, species_module_1.SpeciesModule, vehicle_module_1.VehicleModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(9);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 9 */
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
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


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
const common_1 = __webpack_require__(5);
const character_controller_1 = __webpack_require__(28);
let CharacterModule = class CharacterModule {
};
CharacterModule = __decorate([
    common_1.Module({
        imports: [characterData_module_1.CharacterDataModule],
        controllers: [character_controller_1.CharacterController],
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
const characterData_providers_1 = __webpack_require__(16);
const characterData_service_1 = __webpack_require__(19);
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
const config_module_1 = __webpack_require__(13);
const database_providers_1 = __webpack_require__(14);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(15);
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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(14);
const character_schema_1 = __webpack_require__(17);
exports.CHARACTER_MODEL_TOKEN = 'CHARACTER_MODEL';
exports.characterDataProviders = [
    {
        provide: exports.CHARACTER_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Character', character_schema_1.CharacterSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(15);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(18);
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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("mongoose-cursor-pagination-plugin");

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const characterData_providers_1 = __webpack_require__(16);
const characterFindInput_dto_1 = __webpack_require__(20);
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
/* 20 */
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
const graphql_1 = __webpack_require__(21);
const class_transformer_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
const characterPaginateInput_dto_1 = __webpack_require__(24);
const characterWhereInput_dto_1 = __webpack_require__(27);
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

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
const paginateInput_dto_1 = __webpack_require__(25);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
/* 25 */
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
const class_transformer_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
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
/* 26 */
/***/ (function(module, exports) {

module.exports = require("type-graphql");

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
/* 28 */
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
const characterData_service_1 = __webpack_require__(19);
const characterFindInput_dto_1 = __webpack_require__(20);
const common_1 = __webpack_require__(5);
let CharacterController = class CharacterController {
    constructor(characterDataService) {
        this.characterDataService = characterDataService;
    }
    getAllFilms(params) {
        const findOptions = Object.assign(characterFindInput_dto_1.CharacterFindInputDto.default(), params);
        return this.characterDataService.findAll(findOptions);
    }
    getById(id) {
        return this.characterDataService.findById(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [characterFindInput_dto_1.CharacterFindInputDto]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getAllFilms", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getById", null);
CharacterController = __decorate([
    common_1.Controller('characters'),
    __metadata("design:paramtypes", [characterData_service_1.CharacterDataService])
], CharacterController);
exports.CharacterController = CharacterController;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const filmData_module_1 = __webpack_require__(30);
const common_1 = __webpack_require__(5);
const film_controller_1 = __webpack_require__(34);
let FilmModule = class FilmModule {
};
FilmModule = __decorate([
    common_1.Module({
        imports: [filmData_module_1.FilmDataModule],
        controllers: [film_controller_1.FilmController],
    })
], FilmModule);
exports.FilmModule = FilmModule;


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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const filmData_providers_1 = __webpack_require__(31);
const filmData_service_1 = __webpack_require__(33);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(14);
const film_schema_1 = __webpack_require__(32);
exports.FILM_MODEL_TOKEN = 'FILM_MODEL';
exports.filmDataProviders = [
    {
        provide: exports.FILM_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Film', film_schema_1.FilmSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(15);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(18);
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
/* 33 */
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
const filmData_providers_1 = __webpack_require__(31);
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
const filmFindInput_dto_1 = __webpack_require__(35);
const filmData_service_1 = __webpack_require__(33);
const common_1 = __webpack_require__(5);
let FilmController = class FilmController {
    constructor(filmDataService) {
        this.filmDataService = filmDataService;
    }
    getAllFilms(params) {
        const findOptions = Object.assign(filmFindInput_dto_1.FilmFindInputDto.default(), params);
        return this.filmDataService.findAll(findOptions);
    }
    getById(id) {
        return this.filmDataService.findById(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filmFindInput_dto_1.FilmFindInputDto]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "getAllFilms", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "getById", null);
FilmController = __decorate([
    common_1.Controller('films'),
    __metadata("design:paramtypes", [filmData_service_1.FilmDataService])
], FilmController);
exports.FilmController = FilmController;


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
const graphql_1 = __webpack_require__(21);
const class_transformer_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
const filmPaginateInput_dto_1 = __webpack_require__(36);
const filmWhereInput_dto_1 = __webpack_require__(37);
class FilmFindInputDto extends graphql_1.FilmFindInput {
    static default() {
        return {
            paginate: {},
            filter: {},
        };
    }
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => filmPaginateInput_dto_1.FilmPaginateInputDto),
    __metadata("design:type", filmPaginateInput_dto_1.FilmPaginateInputDto)
], FilmFindInputDto.prototype, "paginate", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => filmWhereInput_dto_1.FilmWhereInputDto),
    __metadata("design:type", filmWhereInput_dto_1.FilmWhereInputDto)
], FilmFindInputDto.prototype, "filter", void 0);
exports.FilmFindInputDto = FilmFindInputDto;


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
const paginateInput_dto_1 = __webpack_require__(25);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
const graphql_1 = __webpack_require__(21);
const class_transformer_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const locationData_module_1 = __webpack_require__(39);
const common_1 = __webpack_require__(5);
const location_controller_1 = __webpack_require__(46);
let LocationModule = class LocationModule {
};
LocationModule = __decorate([
    common_1.Module({
        imports: [locationData_module_1.LocationDataModule],
        controllers: [location_controller_1.LocationController],
    })
], LocationModule);
exports.LocationModule = LocationModule;


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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const locationData_providers_1 = __webpack_require__(40);
const locationData_service_1 = __webpack_require__(42);
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(14);
const location_schema_1 = __webpack_require__(41);
exports.LOCATION_MODEL_TOKEN = 'LOCATION_MODEL';
exports.locationDataProviders = [
    {
        provide: exports.LOCATION_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Location', location_schema_1.LocationSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(15);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(18);
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
/* 42 */
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
const locationFindInput_dto_1 = __webpack_require__(43);
const locationData_providers_1 = __webpack_require__(40);
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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
const graphql_1 = __webpack_require__(21);
const locationPaginateInput_dto_1 = __webpack_require__(44);
const locationWhereInput_dto_1 = __webpack_require__(45);
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
const paginateInput_dto_1 = __webpack_require__(25);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
const graphql_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const locationFindInput_dto_1 = __webpack_require__(43);
const locationData_service_1 = __webpack_require__(42);
const common_1 = __webpack_require__(5);
let LocationController = class LocationController {
    constructor(locationDataService) {
        this.locationDataService = locationDataService;
    }
    getAllFilms(params) {
        const findOptions = Object.assign(locationFindInput_dto_1.LocationFindInputDto.default(), params);
        return this.locationDataService.findAll(findOptions);
    }
    getById(id) {
        return this.locationDataService.findById(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [locationFindInput_dto_1.LocationFindInputDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getAllFilms", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getById", null);
LocationController = __decorate([
    common_1.Controller('locations'),
    __metadata("design:paramtypes", [locationData_service_1.LocationDataService])
], LocationController);
exports.LocationController = LocationController;


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
Object.defineProperty(exports, "__esModule", { value: true });
const speciesData_module_1 = __webpack_require__(48);
const common_1 = __webpack_require__(5);
const species_controller_1 = __webpack_require__(54);
let SpeciesModule = class SpeciesModule {
};
SpeciesModule = __decorate([
    common_1.Module({
        imports: [speciesData_module_1.SpeciesDataModule],
        controllers: [species_controller_1.SpeciesController],
    })
], SpeciesModule);
exports.SpeciesModule = SpeciesModule;


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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const speciesData_providers_1 = __webpack_require__(49);
const speciesData_service_1 = __webpack_require__(51);
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(14);
const species_schema_1 = __webpack_require__(50);
exports.SPECIES_MODEL_TOKEN = 'SPECIES_MODEL';
exports.speciesDataProviders = [
    {
        provide: exports.SPECIES_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Species', species_schema_1.SpeciesSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(15);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(18);
const SpeciesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});
exports.SpeciesSchema = SpeciesSchema;
SpeciesSchema.plugin(mongoose_cursor_pagination_plugin_1.MongoPaging.mongoosePlugin);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const speciesFindInput_dto_1 = __webpack_require__(52);
const speciesData_providers_1 = __webpack_require__(49);
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
/* 52 */
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
const class_transformer_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
const graphql_1 = __webpack_require__(21);
const speciesPaginateInput_dto_1 = __webpack_require__(53);
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
/* 53 */
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
const paginateInput_dto_1 = __webpack_require__(25);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
/* 54 */
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
const speciesFindInput_dto_1 = __webpack_require__(52);
const speciesData_service_1 = __webpack_require__(51);
const common_1 = __webpack_require__(5);
let SpeciesController = class SpeciesController {
    constructor(speciesDataService) {
        this.speciesDataService = speciesDataService;
    }
    getAll(params) {
        const findOptions = Object.assign(speciesFindInput_dto_1.SpeciesFindInputDto.default(), params);
        return this.speciesDataService.findAll(findOptions);
    }
    getById(id) {
        return this.speciesDataService.findById(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [speciesFindInput_dto_1.SpeciesFindInputDto]),
    __metadata("design:returntype", Promise)
], SpeciesController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpeciesController.prototype, "getById", null);
SpeciesController = __decorate([
    common_1.Controller('species'),
    __metadata("design:paramtypes", [speciesData_service_1.SpeciesDataService])
], SpeciesController);
exports.SpeciesController = SpeciesController;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicleData_module_1 = __webpack_require__(56);
const common_1 = __webpack_require__(5);
const vehicle_controller_1 = __webpack_require__(62);
let VehicleModule = class VehicleModule {
};
VehicleModule = __decorate([
    common_1.Module({
        imports: [vehicleData_module_1.VehicleDataModule],
        controllers: [vehicle_controller_1.VehicleController],
    })
], VehicleModule);
exports.VehicleModule = VehicleModule;


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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(5);
const database_module_1 = __webpack_require__(12);
const vehicleData_providers_1 = __webpack_require__(57);
const vehicleData_service_1 = __webpack_require__(59);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const database_providers_1 = __webpack_require__(14);
const vehicle_schema_1 = __webpack_require__(58);
exports.VEHICLE_MODEL_TOKEN = 'VEHICLE_MODEL';
exports.vehicleDataProviders = [
    {
        provide: exports.VEHICLE_MODEL_TOKEN,
        useFactory: (connection) => connection.model('Vehicle', vehicle_schema_1.VehicleSchema),
        inject: [database_providers_1.DATABASE_CONNECTION_TOKEN],
    },
];


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(15);
const mongoose_cursor_pagination_plugin_1 = __webpack_require__(18);
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
const common_1 = __webpack_require__(5);
const vehicleFindInput_dto_1 = __webpack_require__(60);
const vehicleData_providers_1 = __webpack_require__(57);
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
const class_transformer_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
const graphql_1 = __webpack_require__(21);
const vehiclePaginateInput_dto_1 = __webpack_require__(61);
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
/* 61 */
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
const paginateInput_dto_1 = __webpack_require__(25);
const class_validator_1 = __webpack_require__(23);
const type_graphql_1 = __webpack_require__(26);
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
/* 62 */
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
const vehicleFindInput_dto_1 = __webpack_require__(60);
const vehicleData_service_1 = __webpack_require__(59);
const common_1 = __webpack_require__(5);
let VehicleController = class VehicleController {
    constructor(vehicleDataService) {
        this.vehicleDataService = vehicleDataService;
    }
    getAll(params) {
        const findOptions = Object.assign(vehicleFindInput_dto_1.VehicleFindInputDto.default(), params);
        return this.vehicleDataService.findAll(findOptions);
    }
    getById(id) {
        return this.vehicleDataService.findById(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicleFindInput_dto_1.VehicleFindInputDto]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getById", null);
VehicleController = __decorate([
    common_1.Controller('vehicles'),
    __metadata("design:paramtypes", [vehicleData_service_1.VehicleDataService])
], VehicleController);
exports.VehicleController = VehicleController;


/***/ })
/******/ ]);