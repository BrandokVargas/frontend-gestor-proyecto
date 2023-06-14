const Barra = ({ porcentaje }) => {

    const barStyle = {
        width: `${porcentaje}%`,
        backgroundColor: '#82D4EA',
        borderRadius: "10px",
        height: '30px',
        marginTop: '10px'
    };

    return (
        <div>
            <div style={barStyle}></div>
        </div>
    );
};

export default Barra;