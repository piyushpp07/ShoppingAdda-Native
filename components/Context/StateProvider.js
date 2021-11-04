import React, { useState, useEffect, createContext } from 'react'
import { auth, db } from '../../Firebase'
export const StateContext = createContext();

export const StateProvider = (props) => {
   const [user, setUser] = useState()
   const [cartTotal, setcartTotal] = useState()
   const [cartSave, setcartSave] = useState()
   const [wishTotal, setWishTotal] = useState()
   const [wishSave, setWishSave] = useState()
   const [dataMens, setDataMens] = useState([])
   const [dataWomens, setDataWomens] = useState([])
   const [dataWomens2, setDataWomens2] = useState([])
   const [dataMobile, setDataMobile] = useState([])
   const [dataCart, setDataCart] = useState([])
   const [dataWishlist, setDataWishlist] = useState([])
   const [dataOrder, setDataOrder] = useState([])
   const [second, setSecond] = useState([]);
   const [first, setFirst] = useState([]);
   const [orderTotal, setOrderTotal] = useState()
   const [add, setAdd] = useState([])
   useEffect(() => {
      auth.onAuthStateChanged(usr => {
         if (usr != null)
            setUser(usr.uid)
         else
            setUser(null);
      })

      //Mens Data Fetching
      const getMensDataFromFirebase = [];
      db.collection('collection').doc("mens").collection("MensAttire").onSnapshot((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            getMensDataFromFirebase.push({ ...doc.data(), key: doc.id });
         });
         setDataMens(getMensDataFromFirebase);
      });

      //Womens Data Fetching
      const getWomenDataFromFirebase = [];
      db.collection('collection').doc("women").collection("WomenAttire").orderBy('price').limit(3).onSnapshot((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            getWomenDataFromFirebase.push({ ...doc.data(), key: doc.id });
         });
         setDataWomens(getWomenDataFromFirebase);
      });
      const getWomenData2FromFirebase = [];
      db.collection('collection').doc("women").collection("WomenAttire").orderBy('price', 'desc').limit(4).onSnapshot((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            getWomenData2FromFirebase.push({ ...doc.data(), key: doc.id });
         });
         setDataWomens2(getWomenData2FromFirebase);
      });

      //Mobile Data Fetching
      const getMobileDataFromFirebase = [];
      db.collection('collection').doc("mens").collection("WomenAttire").onSnapshot((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            getMobileDataFromFirebase.push({ ...doc.data(), key: doc.id });
         });
         setDataMobile(getMobileDataFromFirebase);
      });

      //Cart Data Fetching
      if (user !== null) {
         db.collection('users').doc(user).collection('cart').onSnapshot((a) => {
            const fdata = [];
            a.forEach((item) => {
               fdata.push({ ...item.data(), key: item.id })

            })
            setDataCart(fdata)
         })

         //Wishlist Data from Firebase
         db.collection('users').doc(user).collection("wish").onSnapshot((querySnapshot) => {
            const getWishDataFromFirebase = [];
            querySnapshot.forEach((doc) => {
               getWishDataFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setDataWishlist(getWishDataFromFirebase);
         });
         db.collection('users').doc(user).collection("order").onSnapshot((querySnapshot) => {
            const getOrderDataFromFirebase = [];
            querySnapshot.forEach((doc) => {
               getOrderDataFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setDataOrder(getOrderDataFromFirebase);
         });
         db.collection('users').doc(user).collection('cart').onSnapshot((a) => {
            let total = 0;
            let save = 0;
            a.forEach((item) => {
               total = total + Number(item.data().price)
               save = save + Number(item.data().oldPrice - item.data().price)
            })
            setcartSave(save)
            setcartTotal(total)
         })
         db.collection('users').doc(user).collection('order').onSnapshot((a) => {
            let total = 0;
            a.forEach((item) => {
               total = total + Number(item.data().price)
            })
            setOrderTotal(total)
         })
         db.collection('users').doc(user).collection('wish').onSnapshot((a) => {
            let total = 0;
            let save = 0;
            a.forEach((item) => {
               total = total + Number(item.data().price)
               save = save + Number(item.data().oldPrice - item.data().price)
            })
            setWishSave(save)
            setWishTotal(total)
         })

         //Mens Second Data
         const getMobileDataFromFirebase = [];
         db.collection('collection').doc("mens").collection("MensAttire").orderBy('price').limit(3).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               getMobileDataFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setSecond(getMobileDataFromFirebase);
         });

         // Mens First Data
         const getFirstDataFromFirebase = [];
         db.collection('collection').doc("mens").collection("MensAttire").orderBy('price', 'desc').limit(3).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               getFirstDataFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setFirst(getFirstDataFromFirebase);
         });
         const getAddress = [];
         db.collection('users').doc(user).collection('shipping').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               getAddress.push({ ...doc.data(), key: doc.id });
            });
            setAdd(getAddress);
         });
      }


   }, [user])



   return (
      <StateContext.Provider
         value={{
            mens: [dataMens, setDataMens],
            womens: [dataWomens, setDataWomens],
            userdata: [user, setUser],
            mobile: [dataMobile, setDataMobile],
            cart: [dataCart, setDataCart],
            wish: [dataWishlist, setDataWishlist],
            cartsave: [cartSave, setcartSave],
            carttotal: [cartTotal, setcartTotal],
            wishsave: [wishSave, setWishSave],
            wishtotal: [wishTotal, setWishTotal],
            seco: [second, setSecond],
            firs: [first, setFirst],
            wo2: [dataWomens2, setDataWomens2],
            dataO: [dataOrder, setDataOrder],
            ot: [orderTotal, setOrderTotal],
            addr: [add, setAdd],
         }
         }
      >
         {props.children}
      </StateContext.Provider >
   )
}