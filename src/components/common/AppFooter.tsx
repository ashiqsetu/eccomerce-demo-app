const styles = {
    ul: {
        display: "flex",
        alignItems: "center", 
        justifyContent: "center", 
        gap: "20px",
        padding: '10px 0',
        listStyle: "none",
        margin: '0px'
    },
    a: {
        textDecoration: 'none',
        color: "#d6b161"
    }
}

function Footer () {
    return <>
        <footer>
            <nav>
                <ul style={styles.ul}>
                    <li><a style={styles.a} href="#">Home</a></li>
                    <li><a style={styles.a} href="#">Shop</a></li>
                    <li><a style={styles.a} href="#">Cart</a></li>
                    <li><a style={styles.a} href="#">Login</a></li>
                </ul>
            </nav>
        </footer>
    </>;
}

export default Footer;