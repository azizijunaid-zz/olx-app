const Navbar =  Navbar(() => {
    return (
        <div>
            <Nav>
                <NavItem>
                    <NavLink href="#" >Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Logout</NavLink>
                </NavItem>
            </Nav>
        </div>
    )
});

export default Navbar;

