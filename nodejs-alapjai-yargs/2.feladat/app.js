const yargs = require('yargs')
// beimportáljuk a builder-t
const { id, name, price, count } = require('./options')
// beimportáljuk a factory-t
const ProductsApi = require('./products-api')
// majd példányosítjuk (az adatbázis 'products' részét parse-oljuk)
const productsApi = ProductsApi('./products.json', 'products')
// beimportáljuk a services-t
const ProductsService = require('./services')
// beimportálom az adott függvényeket
const { getAllProducts, sumAllProducts, avgAllProducts, lessThan, findProductById, createProduct, editProduct, removeProduct } = ProductsService(productsApi)

yargs
    .version('1.0.0')
    .usage('Usage: <command> [options]')
    // Összes termék lekérése
    .command({command:'get', describe:'Get all products', handler: async function(){console.log(await getAllProducts())}})
    // Sum parancs
    .command({command:'sum', describe:'Summarize value of all products', handler: async function(){console.log(await sumAllProducts())}})
    // Avg parancs
    .command({command:'avg', describe:'Average value of all products', handler: async function(){console.log(await avgAllProducts())}})
    // Lessthan parancs
    .command({command:'lessthan', describe:'Less than...', builder:{count}, handler: async function({count}){console.log(await lessThan(count))}})
    // Find parancs
    .command({command:'find', describe:'Find a movie by ID',
    builder:{id}, handler: async function({id}){console.log(await findProductById(id))}})
    // Create parancs
    .command({command:'create', describe:'Create new product', builder: {name, price, count},
    handler: async function({name, price, count}){console.log(await createProduct(name, price, count))}})
    // Edit parancs
    .command({command:'edit', describe:'Edit an existing product', builder: {id, name, price, count},
    handler: async function({id, name, price, count}){console.log(await editProduct(id, name, price, count))}})
    // Törlés parancs ID alapján
    .command({command:'remove', describe:'Remove an existing product', builder: {id},
    // filter metódussal kitörlöm az adott ID-jű terméket
    handler: async function({id}){await removeProduct(id); console.log('Product deleted')}})
    .locale('en')
    .strict()
    .help()
    .parse()