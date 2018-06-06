import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            usersPerPage: 12,
            data: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos/')
            .then(response => response.json()).then(data => {
            this.setState({
                data: data,
            });
        })
    }


    handlePages = (e) => {
        this.setState({
            currentPage: Number(e.target.id),
        });
    };

    handleNext = () => {
        this.state.currentPage === 417 ? this.setState({currentPage: 1}) : this.setState({currentPage: this.state.currentPage + 1})
    };

    handleBack = () => {
        this.state.currentPage === 1 ? this.setState({currentPage: 417}) : this.setState({currentPage: this.state.currentPage - 1})
    };

    handleShowPhoto = (data) => {
        this.setState({
            clickedID: data.id
        });
    };

    render() {
        const left = '<';
        const right = '>';
        const { currentPage, usersPerPage, data } = this.state;
        const lastPage = currentPage * usersPerPage;
        const firstPage = lastPage - usersPerPage;
        const renderPhotos = data.slice(firstPage, lastPage).map((photo) => {
            return (
                <tr key={photo.id}>
                    <td><a onClick={this.handleShowPhoto.bind(this, photo)}>{photo.title}</a></td>
                    <td><img style={photo.id === this.state.clickedID ? {display: 'block'} : {display: 'none'}} src={photo.thumbnailUrl} alt=""/></td>
                </tr>
            )
        });

        const numbers = [];
        if(this.state.currentPage === 414 || this.state.currentPage === 2) {
            for (let i = this.state.currentPage - 1; i <= this.state.currentPage + 3; i++) {
                numbers.push(i);
            }
        } else if(this.state.currentPage === 415) {
            for (let i = this.state.currentPage - 2; i <= this.state.currentPage + 2; i++) {
                numbers.push(i);
            }
        } else if(this.state.currentPage === 416) {
            for (let i = this.state.currentPage - 3; i <= this.state.currentPage + 1; i++) {
                numbers.push(i);
            }
        } else if(this.state.currentPage === 417) {
            for (let i = this.state.currentPage - 4; i <= this.state.currentPage; i++) {
                numbers.push(i);
            }
        } else if(this.state.currentPage >= 3) {
            for (let i = this.state.currentPage - 2; i <= this.state.currentPage + 2; i++) {
                numbers.push(i);
            }
        } else if(this.state.currentPage === 1) {
            for (let i = this.state.currentPage; i <= this.state.currentPage + 4; i++) {
                numbers.push(i);
            }
        }

        const renderPagination = numbers.map(number => {
            return (
                <li className={(this.state.currentPage === number? 'active': '')+ ' controls'} key={number} id={number} onClick={this.handlePages}>
                    {number}
                </li>
            );
        });

        return (
            <main>
                <table>
                    <tbody>
                    <tr>
                        <td><h1>Welcome back!</h1></td>
                        <td>Click on title to show image</td>
                    </tr>
                    {renderPhotos}
                    </tbody>
                </table>
                <ul>
                    <li className="lt" onClick={this.handleBack}>{left}</li>
                    {renderPagination}
                    <li className="rt" onClick={this.handleNext}>{right}</li>
                </ul>
            </main>
        );
    }
}

export default Main


