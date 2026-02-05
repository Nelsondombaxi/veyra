import React, { useState, useEffect } from 'react';
import { FiTrash2, FiPlus, FiShoppingBag, FiCheckCircle, FiCircle, FiX } from 'react-icons/fi';
import './Wishlist.css';

const Wishlist = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("@veyra:wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [shakeId, setShakeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  useEffect(() => {
    localStorage.setItem("@veyra:wishlist", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const item = {
      id: Date.now(),
      name: newItem.name,
      price: parseFloat(newItem.price),
      completed: false
    };

    setItems([item, ...items]);
    setNewItem({ name: '', price: '' });
    setIsModalOpen(false);
  };

  const toggleComplete = (id) => {
    const financeRaw = localStorage.getItem("@veyra:finance");
    const financeData = financeRaw ? JSON.parse(financeRaw) : { balance: 0 };
    
    const targetItem = items.find(item => item.id === id);
    
    if (!targetItem || targetItem.completed) return;

    if (financeData.balance >= targetItem.price) {
      const newBalance = financeData.balance - targetItem.price;
      const updatedFinance = { ...financeData, balance: newBalance };
      
      localStorage.setItem("@veyra:finance", JSON.stringify(updatedFinance));

      window.dispatchEvent(new Event("storage"));

      setItems(items.map(item => 
        item.id === id ? { ...item, completed: true } : item
      ));
    } else {
      setShakeId(id);
      setTimeout(() => setShakeId(null), 500); 
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
    }).format(value).replace('AOA', 'Kz');
  };

  return (
    <div className="wishlist-section">
      <div className="wishlist-header">
        <div className="header-info">
          <h3 className="section-label">FINANCEIRO</h3>
          <h2>Lista de Compras</h2>
          <p>Gerencie seus desejos e metas de consumo.</p>
          <button className="btn-add-trigger" onClick={() => setIsModalOpen(true)}>
            <FiPlus /> Adicionar Item
          </button>
        </div>

        <div className="premium-logo-box">
          <div className="logo-glow"></div>
          <FiShoppingBag className="main-logo-icon" />
        </div>
      </div>

      <div className="wishlist-table">
        <div className="table-head">
          <span>ITEM DESCRIÇÃO</span>
          <span>VALOR (Kz)</span>
        </div>

        <div className="table-body">
          {items.length === 0 ? (
            <div className="empty-list-container">
              <p>Nenhum desejo listado ainda.</p>
            </div>
          ) : (
            items.map(item => (
              <div 
                key={item.id} 
                className={`list-row ${item.completed ? 'is-done locked' : ''} ${shakeId === item.id ? 'shake-error' : ''}`}
                style={{ cursor: item.completed ? 'default' : 'pointer' }}
              >
                <div className="row-main" onClick={() => toggleComplete(item.id)}>
                  <div className="status-icon">
                    {item.completed ? <FiCheckCircle className="done" /> : <FiCircle />}
                  </div>
                  <span className="name">{item.name}</span>
                </div>
                
                <div className="row-actions">
                  <span className="price">{formatCurrency(item.price)}</span>
                  <button className="btn-del" onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="wish-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="wish-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-area">
                <h3>Novo Desejo</h3>
                <p>O que você vai conquistar?</p>
              </div>
              <button className="modal-close-x" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleAddItem}>
              <div className="input-field">
                <label>NOME DO ITEM</label>
                <input 
                  type="text" 
                  placeholder="Ex: PlayStation 5" 
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  autoFocus
                  required
                />
              </div>
              <div className="input-field">
                <label>VALOR ESTIMADO (Kz)</label>
                <input 
                  type="number" 
                  placeholder="0,00" 
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn-modal-submit">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;