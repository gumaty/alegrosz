import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductSearch from "./components/ProductSearch.jsx";
import ProductList from "./components/ProductList.jsx";
import Container from "@mui/material/Container";
import { CircularProgress, FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useSearchParams } from "react-router-dom";

function App() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");

    const [sortByPrice, setSortByPrice] = useState(
        searchParams.get("sortBy") || "none"
    );


    useEffect(() => {
        setSearchParams({ "sortBy": sortByPrice });
    }, [sortByPrice]);

    useEffect(() => {
        const controller = new AbortController();
        getProducts(controller.signal).then((data) => setProducts(data));

        return () => {
            controller.abort();
        };
    }, []);


    async function getProducts(signal) {
        const response = await fetch("http://localhost:3000/products", {
            signal
        });
        return await response.json();
    }

    if (!products.length) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginInline: "auto"
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        );
    }

    return (
        <>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Alegrosz</h1>
                    </Grid>
                    <Grid item xs={4}>
                        <ProductSearch search={search} setSearch={setSearch} />

                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="sortByPrice">Sort by price</InputLabel>
                            <Select
                                labelId="sortByPrice"
                                id="sortByPrice"
                                value={sortByPrice}
                                label="Sort by price"
                                onChange={(event) => setSortByPrice(event.target.value)}
                            >
                                <MenuItem value={"none"}>----</MenuItem>
                                <MenuItem value={"asc"}>Ascending</MenuItem>
                                <MenuItem value={"desc"}>Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                        <ProductList sortByPrice={sortByPrice} products={products} search={search} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;