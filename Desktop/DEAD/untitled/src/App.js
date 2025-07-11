import { useState } from 'react';

// Главный компонент, который содержит состояние фильтрации
function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState(''); // Состояние для текста фильтра
    const [inStockOnly, setInStockOnly] = useState(false); // Состояние для фильтра "только в наличии"

    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText} // Передаем функции обновления состояния
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </div>
    );
}

// Компонент строки категории товаров
function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2"> {/* Ячейка объединяет 2 колонки */}
                {category}
            </th>
        </tr>
    );
}

// Компонент строки одного товара
function ProductRow({ product }) {
    // Если товара нет в наличии — имя отображается красным
    const name = product.stocked ? product.name : (
        <span style={{ color: 'red' }}>
      {product.name}
    </span>
    );

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

// Таблица товаров с фильтрацией по категории, наличию и текстовому запросу
function ProductTable({ products, filterText, inStockOnly }) {
    const rows = []; // Массив строк таблицы
    let lastCategory = null; // Для группировки по категории

    // Перебираем товары
    products.forEach((product) => {
        // Фильтрация по тексту
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }

        // Фильтрация по наличию
        if (inStockOnly && !product.stocked) {
            return;
        }

        // Если новая категория — добавляем строку категории
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />
            );
        }

        // Добавляем строку товара
        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );

        // Обновляем последнюю категорию
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Наименование</th>
                <th>Цена</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

// Компонент поисковой строки и чекбокса "только в наличии"
function SearchBar({
                       filterText,
                       inStockOnly,
                       onFilterTextChange,
                       onInStockOnlyChange
                   }) {
    return (
        <form>
            {/* Поле ввода текста для фильтрации */}
            <input
                type="text"
                value={filterText}
                placeholder="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            <label>
                {/* Чекбокс "только в наличии" */}
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                />
                {' '}
                Показывать только товар в наличии
            </label>
        </form>
    );
}

// Исходные данные — список товаров
const PRODUCTS = [
    { category: "Фрукты", price: "$1", stocked: true, name: "Яблоко" },
    { category: "Фрукты", price: "$1", stocked: true, name: "Питахайя" },
    { category: "Фрукты", price: "$2", stocked: false, name: "Маракуйя" },
    { category: "Овощи", price: "$2", stocked: true, name: "Шпинат" },
    { category: "Овощи", price: "$4", stocked: false, name: "Тыква" },
    { category: "Овощи", price: "$1", stocked: true, name: "Горох" }
];

// Главный компонент приложения
export default function App() {
    return <FilterableProductTable products={PRODUCTS} />;
}
