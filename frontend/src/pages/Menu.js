import "./Menu.css";

function Menu() {
  return (
    <section className="menu-container">
      <h2>Our Menu</h2>
      <p className="menu-subtitle">Fresh, delicious meals prepared daily.</p>

      <div className="menu-grid">

        <div className="menu-section">
          <h3>Starters</h3>
          <div className="menu-item">
            <span>Garlic Bread</span><span>$6</span>
          </div>
          <p className="desc">Crispy baguette with garlic butter.</p>

          <div className="menu-item">
            <span>Bruschetta</span><span>$8</span>
          </div>
          <p className="desc">Fresh tomatoes, basil, olive oil.</p>
        </div>

        <div className="menu-section">
          <h3>Mains</h3>
          <div className="menu-item">
            <span>Grilled Salmon</span><span>$18</span>
          </div>
          <p className="desc">Fresh Atlantic salmon with lemon butter.</p>

          <div className="menu-item">
            <span>Classic Cheeseburger</span><span>$14</span>
          </div>
          <p className="desc">Beef patty, cheddar, lettuce, tomato.</p>

          <div className="menu-item">
            <span>Margherita Pizza</span><span>$12</span>
          </div>
          <p className="desc">Tomato, mozzarella, basil.</p>

          <div className="menu-item">
            <span>Chicken Alfredo</span><span>$16</span>
          </div>
          <p className="desc">Creamy alfredo sauce with grilled chicken.</p>
        </div>

        <div className="menu-section">
          <h3>Desserts</h3>
          <div className="menu-item">
            <span>Chocolate Lava Cake</span><span>$7</span>
          </div>
          <p className="desc">Warm cake with molten chocolate center.</p>

          <div className="menu-item">
            <span>Vanilla Ice Cream</span><span>$5</span>
          </div>
          <p className="desc">Classic and refreshing.</p>
        </div>

        <div className="menu-section">
          <h3>Drinks</h3>
          <div className="menu-item">
            <span>Cappuccino</span><span>$4</span>
          </div>
          <p className="desc">Perfectly balanced and creamy.</p>

          <div className="menu-item">
            <span>Fresh Juice</span><span>$5</span>
          </div>
          <p className="desc">Orange, mango, or mixed fruit.</p>
        </div>

      </div>
    </section>
  );
}

export default Menu;
