import { Express } from "express"
import fs from "fs"
import path from "path"

export default (app: Express) => {
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf(".")) !== 0 && (file !== "index.ts") && (file !== "index.js")))
    .forEach(file => {
      import(path.resolve(__dirname, file))
        .then(routes => routes.default(app))
    })
}
