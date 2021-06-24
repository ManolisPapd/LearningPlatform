import React from 'react';
import PropTypes from 'prop-types';

import './ModalHelper.css';

const ModalHelper = ({ children, customClass, show, closeCallback }) => (
  <div className={`modalHelper ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
    <div className="overlay" onClick={closeCallback}></div>
    <div className="modalHelper_content">
      {children}
      <button title="Close" className="close_modalHelper" onClick={closeCallback}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  </div>
);

ModalHelper.propTypes = {
  children: PropTypes.element,
  customClass: PropTypes.string,
  show: PropTypes.bool,
  closeCallback: PropTypes.func,
  
  
};

ModalHelper.defaultProps = {
  children: <div>Empty ModalHelper</div>,
  customClass: '',
  show: false,
  
  closeCallback: () => (false)
};

export default ModalHelper;