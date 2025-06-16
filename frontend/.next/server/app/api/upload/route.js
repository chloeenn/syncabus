/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

/***/ "(rsc)/./app/api/upload/route.ts":
/*!*********************************!*\
  !*** ./app/api/upload/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function POST(req) {\n    try {\n        //Parse form data\n        const data = await req.formData();\n        const file = data.get(\"file\");\n        if (!file) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"No file provided\"\n            }, {\n                status: 400\n            });\n        }\n        const arrayBuffer = await file.arrayBuffer(); // Convert to ArrayBuffer\n        const buffer = Buffer.from(arrayBuffer); // Convert to Node.js Buffer\n        //Initialize S3 Client\n        const s3 = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.S3Client({\n            region: `${process.env.S3_AWS_REGION}`,\n            credentials: {\n                accessKeyId: process.env.S3_ACCESS_KEY,\n                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY\n            },\n            // ToDo: Remove workaround once https://github.com/aws/aws-sdk-js-v3/issues/6834 is fixed.\n            requestChecksumCalculation: \"WHEN_REQUIRED\"\n        });\n        //PUT file\n        const fileName = file.name.replace(/\\s+/g, \"-\");\n        const fileKey = `uploads/${Date.now().toString()}-${fileName}`;\n        const input = {\n            Bucket: process.env.S3_BUCKET_NAME,\n            Key: fileKey,\n            Body: buffer,\n            ContentType: file.type\n        };\n        const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.PutObjectCommand(input);\n        await s3.send(command);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            fileName,\n            fileKey\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Failed to upload file to S3:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Failed to upload file to S3\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWdFO0FBQ1I7QUFDakQsZUFBZUcsS0FBS0MsR0FBZ0I7SUFDdkMsSUFBSTtRQUNBLGlCQUFpQjtRQUNqQixNQUFNQyxPQUFPLE1BQU1ELElBQUlFLFFBQVE7UUFDL0IsTUFBTUMsT0FBT0YsS0FBS0csR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQ0QsTUFBTTtZQUNQLE9BQU9MLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBbUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzFFO1FBQ0EsTUFBTUMsY0FBYyxNQUFNTCxLQUFLSyxXQUFXLElBQUkseUJBQXlCO1FBQ3ZFLE1BQU1DLFNBQVNDLE9BQU9DLElBQUksQ0FBQ0gsY0FBYyw0QkFBNEI7UUFFckUsc0JBQXNCO1FBQ3RCLE1BQU1JLEtBQUssSUFBSWhCLHdEQUFRQSxDQUFDO1lBQ3BCaUIsUUFBUSxHQUFHQyxRQUFRQyxHQUFHLENBQUNDLGFBQWEsRUFBRTtZQUN0Q0MsYUFBYTtnQkFDVEMsYUFBYUosUUFBUUMsR0FBRyxDQUFDSSxhQUFhO2dCQUN0Q0MsaUJBQWlCTixRQUFRQyxHQUFHLENBQUNNLG9CQUFvQjtZQUNyRDtZQUNBLDBGQUEwRjtZQUMxRkMsNEJBQTRCO1FBQ2hDO1FBQ0EsVUFBVTtRQUNWLE1BQU1DLFdBQVdwQixLQUFLcUIsSUFBSSxDQUFDQyxPQUFPLENBQUMsUUFBUTtRQUMzQyxNQUFNQyxVQUFVLENBQUMsUUFBUSxFQUFFQyxLQUFLQyxHQUFHLEdBQUdDLFFBQVEsR0FBRyxDQUFDLEVBQUVOLFVBQVU7UUFDOUQsTUFBTU8sUUFBUTtZQUNWQyxRQUFRakIsUUFBUUMsR0FBRyxDQUFDaUIsY0FBYztZQUNsQ0MsS0FBS1A7WUFDTFEsTUFBTXpCO1lBQ04wQixhQUFhaEMsS0FBS2lDLElBQUk7UUFDMUI7UUFDQSxNQUFNQyxVQUFVLElBQUl4QyxnRUFBZ0JBLENBQUNpQztRQUNyQyxNQUFNbEIsR0FBRzBCLElBQUksQ0FBQ0Q7UUFDZCxPQUFPdkMscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFa0I7WUFBU0c7UUFBUSxHQUFHO1lBQUVuQixRQUFRO1FBQUk7SUFDakUsRUFBRSxPQUFPRCxPQUFPO1FBQ1ppQyxRQUFRakMsS0FBSyxDQUFDLGdDQUFnQ0E7UUFDOUMsT0FBT1IscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQThCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JGO0FBQ0oiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGxvZW5ndXllbi9EZXNrdG9wL1dFQiBQcm9qZWN0L3N5bmNhYnVzL2Zyb250ZW5kL2FwcC9hcGkvdXBsb2FkL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFMzQ2xpZW50LCBQdXRPYmplY3RDb21tYW5kIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vUGFyc2UgZm9ybSBkYXRhXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXEuZm9ybURhdGEoKTtcbiAgICAgICAgY29uc3QgZmlsZSA9IGRhdGEuZ2V0KFwiZmlsZVwiKSBhcyBGaWxlO1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk5vIGZpbGUgcHJvdmlkZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpOyAvLyBDb252ZXJ0IHRvIEFycmF5QnVmZmVyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyKTsgLy8gQ29udmVydCB0byBOb2RlLmpzIEJ1ZmZlclxuXG4gICAgICAgIC8vSW5pdGlhbGl6ZSBTMyBDbGllbnRcbiAgICAgICAgY29uc3QgczMgPSBuZXcgUzNDbGllbnQoe1xuICAgICAgICAgICAgcmVnaW9uOiBgJHtwcm9jZXNzLmVudi5TM19BV1NfUkVHSU9OfWAsXG4gICAgICAgICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICAgICAgICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5TM19BQ0NFU1NfS0VZISxcbiAgICAgICAgICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LlMzX1NFQ1JFVF9BQ0NFU1NfS0VZIVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFRvRG86IFJlbW92ZSB3b3JrYXJvdW5kIG9uY2UgaHR0cHM6Ly9naXRodWIuY29tL2F3cy9hd3Mtc2RrLWpzLXYzL2lzc3Vlcy82ODM0IGlzIGZpeGVkLlxuICAgICAgICAgICAgcmVxdWVzdENoZWNrc3VtQ2FsY3VsYXRpb246IFwiV0hFTl9SRVFVSVJFRFwiLFxuICAgICAgICB9KVxuICAgICAgICAvL1BVVCBmaWxlXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZS5uYW1lLnJlcGxhY2UoL1xccysvZywgXCItXCIpO1xuICAgICAgICBjb25zdCBmaWxlS2V5ID0gYHVwbG9hZHMvJHtEYXRlLm5vdygpLnRvU3RyaW5nKCl9LSR7ZmlsZU5hbWV9YDtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgICAgICBCdWNrZXQ6IHByb2Nlc3MuZW52LlMzX0JVQ0tFVF9OQU1FISxcbiAgICAgICAgICAgIEtleTogZmlsZUtleSxcbiAgICAgICAgICAgIEJvZHk6IGJ1ZmZlcixcbiAgICAgICAgICAgIENvbnRlbnRUeXBlOiBmaWxlLnR5cGUsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBQdXRPYmplY3RDb21tYW5kKGlucHV0KVxuICAgICAgICBhd2FpdCBzMy5zZW5kKGNvbW1hbmQpXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGZpbGVOYW1lLGZpbGVLZXkgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwbG9hZCBmaWxlIHRvIFMzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byB1cGxvYWQgZmlsZSB0byBTM1wiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfVxufSJdLCJuYW1lcyI6WyJTM0NsaWVudCIsIlB1dE9iamVjdENvbW1hbmQiLCJOZXh0UmVzcG9uc2UiLCJQT1NUIiwicmVxIiwiZGF0YSIsImZvcm1EYXRhIiwiZmlsZSIsImdldCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImFycmF5QnVmZmVyIiwiYnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsInMzIiwicmVnaW9uIiwicHJvY2VzcyIsImVudiIsIlMzX0FXU19SRUdJT04iLCJjcmVkZW50aWFscyIsImFjY2Vzc0tleUlkIiwiUzNfQUNDRVNTX0tFWSIsInNlY3JldEFjY2Vzc0tleSIsIlMzX1NFQ1JFVF9BQ0NFU1NfS0VZIiwicmVxdWVzdENoZWNrc3VtQ2FsY3VsYXRpb24iLCJmaWxlTmFtZSIsIm5hbWUiLCJyZXBsYWNlIiwiZmlsZUtleSIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImlucHV0IiwiQnVja2V0IiwiUzNfQlVDS0VUX05BTUUiLCJLZXkiLCJCb2R5IiwiQ29udGVudFR5cGUiLCJ0eXBlIiwiY29tbWFuZCIsInNlbmQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_chloenguyen_Desktop_WEB_Project_syncabus_frontend_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/route.ts */ \"(rsc)/./app/api/upload/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    resolvedPagePath: \"/Users/chloenguyen/Desktop/WEB Project/syncabus/frontend/app/api/upload/route.ts\",\n    nextConfigOutput,\n    userland: _Users_chloenguyen_Desktop_WEB_Project_syncabus_frontend_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmNobG9lbmd1eWVuJTJGRGVza3RvcCUyRldFQiUyMFByb2plY3QlMkZzeW5jYWJ1cyUyRmZyb250ZW5kJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmNobG9lbmd1eWVuJTJGRGVza3RvcCUyRldFQiUyMFByb2plY3QlMkZzeW5jYWJ1cyUyRmZyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnQztBQUM3RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2NobG9lbmd1eWVuL0Rlc2t0b3AvV0VCIFByb2plY3Qvc3luY2FidXMvZnJvbnRlbmQvYXBwL2FwaS91cGxvYWQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VwbG9hZC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VwbG9hZFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXBsb2FkL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2NobG9lbmd1eWVuL0Rlc2t0b3AvV0VCIFByb2plY3Qvc3luY2FidXMvZnJvbnRlbmQvYXBwL2FwaS91cGxvYWQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fchloenguyen%2FDesktop%2FWEB%20Project%2Fsyncabus%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();