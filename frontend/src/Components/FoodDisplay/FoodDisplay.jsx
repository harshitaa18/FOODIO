import React, { useContext, useEffect, useState } from 'react';
import './FoodDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import FoodItem from '../FoodItem/FoodItem';
import Buttons from '../Buttons/Buttons';
import Pagination from '../Pagination/Pagination';

const FoodDisplay = ({ category }) => {
    const { allproduct } = useContext(ShopContext);
    const [filteredItems, setFilteredItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Add loading state
    const itemsPerPage = 10; // Adjust as per your requirement

    useEffect(() => {
        if (Array.isArray(allproduct) && allproduct.length > 0) {
            setFilteredItems(allproduct);
            setMenuItems([ ...new Set(allproduct.map((val) => val.category))]);
            setLoading(false); // Set loading to false when data is loaded
        }
    }, [allproduct]);

    const filterItems = (cat) => {
        if (cat === "All") {
            setFilteredItems(allproduct);
        } else {
            const newItems = allproduct.filter((newval) => newval.category === cat);
            setFilteredItems(newItems);
        }
        setCurrentPage(1); // Reset to first page when filtering
    };

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
    };

    return (
        <div className='food-display' id='food-display'>
            <h2>Our Popular Menu</h2>
            {loading ? ( // Show a loading indicator
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <Buttons menuItems={menuItems} filterItems={filterItems} />
                    <div className="food-display-list">
                        {getCurrentItems().map((item) => (
                            <FoodItem 
                                key={item.id} 
                                id={item.id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        ))}
                    </div>
                    <Pagination
                        totalItems={filteredItems.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
        </div>
    );
};

export default FoodDisplay;
