import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

interface Product {
    id: string;
    name: string;
    category: string;
    stock: number;
    isVencido: boolean;
}

@Controller('productos')
export class ProductosController {

    private Products: Product[] = [
        { id: '1', name: 'Leche Colacteos 1L', category: 'Lácteos', stock: 15, isVencido: false },
        { id: '2', name: 'Yogurt Colacteos Fresa', category: 'Lácteos', stock: 0, isVencido: false },
        { id: '3', name: 'Queso Campesino', category: 'Lácteos', stock: 5, isVencido: true },
        { id: '4', name: 'Pan Tajado La12', category: 'Panadería', stock: 0, isVencido: false },
        { id: '5', name: 'Galletas Festival', category: 'Panadería', stock: 20, isVencido: true },
        { id: '6', name: 'Manzana Roja kg', category: 'Frutas', stock: 12, isVencido: false },
        { id: '7', name: 'Pera Verde kg', category: 'Frutas', stock: 0, isVencido: true },
        { id: '8', name: 'Arroz Roa 1kg', category: 'Abarrotes', stock: 50, isVencido: false },
        { id: '9', name: 'Aceite Gourmet 1L', category: 'Abarrotes', stock: 8, isVencido: false },
        { id: '10', name: 'Atún Van Camp\'s', category: 'Enlatados', stock: 0, isVencido: false }
    ];

    // A. Listar Productos
    @Get('')
    getAllProducts() {
        return this.Products;
    }

    // C. Listar Productos sin Stock (Se coloca antes de :id para evitar colisiones de rutas)
    @Get('sin-stock')
    getProductsOutStock() {
        return this.Products.filter((product) => product.stock === 0);
    }

    // D. Listar Productos Vencidos
    @Get('vencidos')
    getExpiredProducts() {
        return this.Products.filter((product) => product.isVencido === true);
    }

    // E. Listar Productos por Categoría
    @Get('categoria/:category')
    getProductsByCategory(@Param('category') category: string) {
        return this.Products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );
    }

    // B. Listar Producto por ID
    @Get(':id')
    getProductById(@Param('id') id: string) {
        console.log('.:: Product ID:', id);
        const product = this.Products.find((product) => product.id === id);
        console.log('.:: Producto buscado:', product);

        if (!product) {
            throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
        }

        return product;
    }
}