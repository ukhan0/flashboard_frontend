import React from 'react';


export default function Menu({ x, y, showMenu }) {
    console.log(x,"x",y,"y")
    // alert("jjj")
  const style = () => {
    return {
      height: 1000,
      width: 150,
      borderRadius: 10,
      backgroundColor: '#FF5C58',
      color: '#FCD2D1',
      display: 'flex',
      flexDirection: 'column',
      padding: 10,
      top: y,
      left: x,
      position: 'absolute',
      display: showMenu ? 'flex' : 'none'
    };
  };
  return (
    <div style={style()}>
      <div style={styles.div}>Button1</div>
      <div style={{ ...styles.div, ...styles.margin }}>Button2</div>
      <div style={styles.div}>Button5</div>
    </div>
  );
}
const styles = {
  div: {
    alignItems: 'center',
    flex: 1,
    color: '#FFEDD3',
    fontWeight: 'bold',
    cursor: 'pointer',
    display:"flex"
  },
  margin: {
    // margin: '10px,0'
  }
};
