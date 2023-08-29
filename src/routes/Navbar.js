import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from "react";
import "./Navbar.css";



function Navbar(){
    const navRef = useRef();

    const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
    return(
        <div>
        <header>
			<h3>Inventory Management</h3>
			<nav ref={navRef}>
				<a href="/">Add Books</a>
				{/* <a href="/add_books">Add Books</a> */}
				<a href="/stock">Stock</a>
				{/* <a href="/dashboard">Dashboard</a> */}
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<CloseIcon />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<MenuIcon />
			</button>
		</header>
        
        </div>
    );
}

export default Navbar;