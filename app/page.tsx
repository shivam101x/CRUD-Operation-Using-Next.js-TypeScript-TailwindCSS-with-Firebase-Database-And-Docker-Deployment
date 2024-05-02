'use client'
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDoc, QuerySnapshot, query, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from './firebase';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ firstname: '', lastname: '', address: '', age: '' });
  const [editingItem, setEditingItem] = useState(null);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.firstname !== '' && newItem.lastname !== '' && newItem.address !== '' && newItem.age !== '') {
      await addDoc(collection(db, 'items'), {
        firstname: newItem.firstname.trim(),
        lastname: newItem.lastname.trim(),
        address: newItem.address.trim(),
        age: newItem.age.trim()
      });
      setNewItem({ firstname: '', lastname: '', address: '', age: '' });
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = [];
      QuerySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  const editItem = (item) => {
    setEditingItem(item);
    // Set the newItem state to the values of the item being edited
    setNewItem({
      firstname: item.firstname,
      lastname: item.lastname,
      address: item.address,
      age: item.age
    });
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'items', editingItem.id), {
      firstname: newItem.firstname.trim(),
      lastname: newItem.lastname.trim(),
      address: newItem.address.trim(),
      age: newItem.age.trim()
    });
    setEditingItem(null);
    setNewItem({ firstname: '', lastname: '', address: '', age: '' });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
       <h1 className='text-4xl p-8 text-center'>CRUD OPERATION PAGE TASK FOR PRIC </h1>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        {/* <h6 className='text-4xl p-8 text-center'> Frontend built with Next.js Tailwind Css and TypeScript </h6> */}
        {/* <h6 className='text-4xl p-8 text-center'>Implemented CRUD operations (Create, Read, Update, Delete) for user data.</h6> */}
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              value={newItem.firstname}
              onChange={(e) => setNewItem({ ...newItem, firstname: e.target.value })}
              className='col-span-3 p-3 border mx-3 my-3'
              type="text"
              placeholder="Firstname"
            />
            <input
              value={newItem.lastname}
              onChange={(e) => setNewItem({ ...newItem, lastname: e.target.value })}
              className='col-span-3 p-3 border mx-3 my-3'
              type="text"
              placeholder="Lastname"
            />
            <input
              value={newItem.address}
              onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
              className='col-span-3 p-3 border mx-3 my-3'
              type="text"
              placeholder="Address"
            />
            <input
              value={newItem.age}
              onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
              className='col-span-3 p-3 border mx-3 my-3'
              type="number"
              placeholder="Age"
            />

            {editingItem ? (
              <button onClick={updateItem} className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-l' type="submit">Update Record</button>
            ) : (
              <button onClick={addItem} className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl' type="submit">Save Record</button>
            )}
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className='text-white my-4 w-full flex justify-between bg-slate-950'>
                <div className='p-4 w-full flex justify-between'>
                  <span>{item.firstname}</span>
                  <span>{item.lastname}</span>
                  <span>{item.address}</span>
                  <span>{item.age}</span>
                </div>
                <div>
                  <button onClick={() => editItem(item)} className='text-white p-4 border-l-5 border-slate-900 hover:bg-slate-900 ml-2'>Edit</button>
                  <button onClick={() => deleteItem(item.id)} className='text-white ml-2 p-4 border-l-5 border-slate-900 hover:bg-slate-900'>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
