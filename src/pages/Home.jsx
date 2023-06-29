import { useState } from "react"
import Card from "../components/Card"
import {AiOutlinePlus, AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import {MdEdit, MdDelete , MdAddShoppingCart, MdClose} from 'react-icons/md'

const Home = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "MacBook Air 15”",
            image: "/macbook_air_15.jpg",
            price: 26999999,
            category: "Laptop"
        },
        {
            id: 2,
            name: "iPhone 14 Pro",
            image: "/iphone_14_pro.jpg",
            price: 19999999,
            category: "Smartphone"
        },
        {
            id: 3,
            name: "iPhone 14",
            image: "/iphone_14.jpg",
            price: 15999999,
            category: "Smartphone"
        },
        {
            id: 4,
            name: "Apple Vision Pro",
            image: "/apple_vision_pro.jpg",
            price: 66999999,
            category: "Smartphone"
        },
        {
            id: 5,
            name: "Apple Watch Series 8",
            image: "apple_watch_series_8.jpg",
            price: 7999999,
            category: "Watch"
        },
    ])

    const [idSquence, setIdSequence] = useState(products.length+1);
    const [newProduct, setNewProduct]=useState();
    const [editedProduct, setEditedProduct] = useState();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen]=useState(false);
    const [keywords, setKeywords] = useState("");
    const [minHarga, setMinHarga] = useState(0);
    const [maxHarga, setMaxHarga] = useState(Infinity);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(1);

    const sortedFilteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keywords) &&
        product.price >= minHarga &&
        product.price <= maxHarga
    )
    .toSorted((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
          return a[sortBy] > b[sortBy] ? -1 : 1;
        }
    });


  return (
    <>
        <div className="filter">
            <button onClick={() => setNewProduct({ id: idSquence })}><AiOutlinePlus/> Tambah</button>
            <button onClick={() => setIsCartOpen(true)}>Keranjang: {cart.reduce((a, p) => a + p.count, 0)}</button>
            <label>Cari
                <input type="text" onChange={(e) => setKeywords(e.target.value.toLowerCase())}/>
            </label>
            <p>Harga</p>
            <label>minimal
                <input type="number" onChange={(e) => setMinHarga(e.target.value)}/>
            </label>
            <label>maksimal
                <input type="number" onChange={(e) => setMaxHarga(e.target.value || Infinity)}/>
            </label>
            <label>Urutkan:
                <div>
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="id">Normal</option>
                        <option value="name">Nama</option>
                        <option value="price">Harga</option>
                    </select>
                    <select onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Naik</option>
                        <option value="desc">Turun</option>
                    </select>
                </div>
            </label>
        </div>
        <div className='wrapper-product'>
        {
            sortedFilteredProducts
            .filter((_product, i) => i >= page * 3 - 3 && i < page * 3)
            .map((product) => {
                return <>
                    <Card key={product.id}> 
                        <img className='card-img' src={product.image} alt={product.name} />
                        <p className='card-name'>({product.id}){product.name}</p>
                        <p className='card-price'>Rp{product.price.toLocaleString('Id-ID')}</p>
                        <p className="card-category">({product.category})</p>
                        <br />
                        <button onClick={() => {
                                if (cart.find((p) => p.id === product.id)) {
                                    setCart(
                                    cart.map((p) =>
                                        p.id === product.id
                                        ? {
                                            ...p,
                                            count: p.count + 1,
                                            }
                                        : p
                                    )
                                    );
                                } else {
                                    setCart([...cart, { ...product, count: 1 }]);
                                }
                                }}
                                title="Tambahkan ke keranjang"
                            > <MdAddShoppingCart /> Keranjang
                        </button>
                        <button onClick={() => setEditedProduct(product)} title="Edit"><MdEdit />Edit</button>
                        <button onClick={() => confirm(`Apakah Anda yakin ingin menghapus?`) && setProducts(products.filter((p) => p.id !== product.id))}title="Hapus"><MdDelete />Hapus</button>
                    </Card>
                </>
            })
        }
        </div>
        <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Sebelumnya</button>
            {page}
            <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(sortedFilteredProducts.length/3)}>Selanjutnya</button>
        </div>

        {/* TAMBAH */}
        {newProduct && (
            <form className="card dialog" onSubmit={(e)=>{
                e.preventDefault()
                setProducts([...products, newProduct]);
                setNewProduct();
                setIdSequence(idSquence + 1);
            }}>
                <h1>Tambah Product</h1>
                <label>ID
                    <input type="number" value={newProduct.id} readOnly/>
                </label>
                <label>Nama Product
                    <input type="text" onChange={(e)=> setNewProduct({...newProduct, name: e.target.value})} required autoFocus/>
                </label>
                <label>Harga
                    <input type="number" onChange={(e)=> setNewProduct({...newProduct, price: e.target.value})} required/>
                </label>
                <label>URL Gambar
                    <input type="text" onChange={(e)=> setNewProduct({...newProduct, image: e.target.value})} required autoFocus/>
                </label>
                <select onChange={(e)=>setNewProduct({...newProduct, category: e.target.value})}>
                    <option value="Laptop">Laptop</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Watch">Whatch</option>
                </select>
                <div>
                    <button onClick={() => setNewProduct()}>Batal</button>
                    <button>Simpan</button>
                </div>
            </form>
        )}

        {/* EDIT */}
        {editedProduct && (
            <form className="card dialog"
            onSubmit={(e) => {
                e.preventDefault();
                setProducts(
                products.map((product) =>
                    product.id === editedProduct.id ? editedProduct : product
                )
                );
                setEditedProduct();
            }}
            >
            <h1>Edit Product</h1>
            <label>
                ID
                <input type="text" value={editedProduct.id} readOnly />
            </label>
            <label>
                Nama
                <input
                type="text"
                value={editedProduct.name}
                onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                }
                required
                autoFocus
                />
            </label>
            <label>
                Harga
                <input
                type="number"
                value={editedProduct.price}
                onChange={(e) =>
                    setEditedProduct({
                    ...editedProduct,
                    diameter: parseFloat(e.target.value),
                    })
                }
                required
                />
            </label>
            <label>
                Url Image
                <input
                type="text"
                value={editedProduct.name}
                onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                }
                required
                autoFocus
                />
            </label>
            <select onChange={(e)=>setEditedProduct({...newProduct, category: e.target.value})}>
                <option value="Laptop">Laptop</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Watch">Whatch</option>
            </select>
            <div>
                <button onClick={() => setEditedProduct()}>Batal</button>
                <button>Simpan</button>
            </div>
            </form>
        )}


        {/* KERANJANG */}
        {isCartOpen && (
                <div className="card dialog">
                <button onClick={() => setIsCartOpen(false)}>
                    <MdClose />
                </button>
                <h1>Keranjang</h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>harga</th>
                        <th>Tindakan</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((product) => (
                        <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.count.toLocaleString()}</td>
                        <td>
                            <button
                            onClick={() => {
                                if (product.count > 1) {
                                setCart(
                                    cart.map((p) =>
                                    p.id === product.id
                                        ? { ...p, count: p.count - 1 }
                                        : p
                                    )
                                );
                                } else {
                                setCart(cart.filter((p) => p.id !== product.id));
                                }
                            }}
                            title="Kurangi"
                            >
                            <AiOutlineMinusCircle />
                            </button>
                            <button
                            onClick={() => {
                                setCart(
                                cart.map((p) =>
                                    p.id === product.id
                                    ? { ...p, count: p.count + 1 }
                                    : p
                                )
                                );
                            }}
                            title="Tambah"
                            >
                            <AiOutlinePlusCircle />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
    </>
  )
}

export default Home