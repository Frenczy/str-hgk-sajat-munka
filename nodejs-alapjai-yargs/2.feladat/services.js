// factory function
const ProductsService = function(productsApi){
    // először lekérjük az összes movie-t
    let productsPromise = productsApi.get()
    // ez a GET parancshoz kell
    const getAllProducts = async function () {return await productsPromise} //
    // ez a SUM parancshoz kell
    const sumAllProducts = async function () {const products = await productsPromise; return products.map(e=>e.price*e.count).reduce((a, b)=>a+b)}
    // ez a AVG parancshoz kell
    const avgAllProducts = async function () {const products = await productsPromise; return products.map(e=>e.price*e.count).reduce((a, b)=>a+b)/products.map(e=>e.count).reduce((a, b)=>a+b)} //
    // ez a LESSTHAN parancshoz kell
    const lessThan = async function(count){const products = await productsPromise; return products.filter(e=>e.count<count)}
    // ez a FIND parancshoz kell
    const findProductById = async function(id){const products = await productsPromise; return products.find(e=>e.id==id)}
    // ez a CREATE parancshoz kell, az ID generálásához először
    // [...movies] készítek egy másolatot az adatbázisról, majd sorba rendezem
    const generateProductId = function(data){const sortedProducts = [...data].sort((a,b)=>a.id>b.id)
    // a legnagyobb ID-hoz hozzáadok még egyet
        return sortedProducts[sortedProducts.length-1].id+1}
    // ez a CREATE parancshoz kell 
    const createProduct = async function(name, price, count){
        let products = await productsPromise 
    // létrehozom az új 'movie' objektumot, az ID helyére behelyettesítem a fenti függvényt
        const product = {id:generateProductId(products), name, price, count}
    // majd a 'movies' adatbázist spread-elem és hozzáfűzöm a legújabb elemet
    // technikailag így a teljes 'movies' adatbázist lecserélem
       let productArray = [...products, product]
    // utolsó lépésként elmentjük a változtatásokat
        productsApi.save(productArray)
        return product}
    // ez az EDIT parancshoz kell
    const editProduct = async function(id, name, price, count){
            // létrehozom az új 'product' objektumot
            const product = {id, name, price, count}
            // .map metódussal rákeresek az ID-ra, 
            // ha egyezik, módosítom (product), ha nem egyezik, marad az eredeti (e)
            let products = await productsPromise 
            products = products.map(e=>e.id==id ? product : e)
            productsApi.save(product)
            return products.find(e=>e.id==id)}
    // ez a REMOVE parancshoz kell
    const removeProduct = async function(id){
        let products = await productsPromise 
        products = products.filter(e=>e.id!=id)
        productsApi.save(products)}   

return {getAllProducts, sumAllProducts, avgAllProducts, lessThan, findProductById, createProduct, editProduct, removeProduct}}

module.exports = ProductsService