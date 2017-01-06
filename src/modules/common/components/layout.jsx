import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Footer from '../components/footer';
import HeaderAuth from '../containers/header-auth';
import isActive from '../../../lib/is-active';

class Layout extends React.Component {
  constructor() {
    super();

    this.renderNav = this.renderNav.bind(this);
    this.renderNavItem = this.renderNavItem.bind(this);
  }

  renderNav() {
    let nav = null;
    if (this.props.navItems) {
      nav = (
        <nav>
          <ul>
            {this.props.navItems.map(this.renderNavItem)}
          </ul>
        </nav>
      );
    }
    return nav;
  }

  renderNavItem(item) {
    if (item.to.match(/^https?:/ig)) {
      return (
        <li key={item.label}>
          <a href={item.to}>{item.label}</a>
        </li>
      );
    }

    return (
      <li key={item.label} className={isActive(this.props.router, item.to) ? 'active' : null}>
        <Link to={item.to}>{item.label}</Link>
      </li>
    );
  }

  render() {
    return (
      <div>
        <header className="site-header">
          <h1 className="title">Zooniverse Lab</h1>
          <HeaderAuth />
          {this.renderNav()}
        </header>

        <main className="content-section">
          {(this.props.user && this.props.loginInitialized ? this.props.children : <div>Loading...</div>)}
        </main>

        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node,
  loginInitialized: React.PropTypes.bool,
  navItems: React.PropTypes.arrayOf(React.PropTypes.object),
  router: React.PropTypes.shape({ isActive: React.PropTypes.func }),
  user: React.PropTypes.shape({ id: React.PropTypes.string }),
};

Layout.defaultProps = {
  loginInitialized: false,
  navItems: [
    { label: 'Home', to: '' },
  ],
  user: null,
};

function mapStateToProps(state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    user: state.user,
    loginInitialized: state.initialized,
  };
}

export default connect(mapStateToProps)(Layout);