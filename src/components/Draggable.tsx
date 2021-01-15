import React, { Component, createRef } from "react";
import './styles.css';

interface DraggableState {
    top: number,
    left: number,
    dragging: boolean
}

export default class Draggable extends Component<any, DraggableState> {
    private _draggable = createRef<HTMLDivElement>().current;
    
    constructor(props: any) {
        super(props);

        this.state = {
            top: 100,
            left: 100,
            dragging: false,
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('mouseup', this.onMouseUp)
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    shouldComponentUpdate(props: any, state: DraggableState) {
        const { top, left, dragging } = this.state;
        if(top !== state.top || left !== state.left || dragging !== this.state.dragging ) {
            return true;
        }

        return false;
    }

    // componentDidUpdate(props: any, state: DraggableState) {
    //     if (this.state.dragging && !state.dragging) {
    //       document.addEventListener('mousemove', this.onMouseMove)
    //       document.addEventListener('mouseup', this.onMouseUp)
    //     } else if (!this.state.dragging && state.dragging) {
    //       document.removeEventListener('mousemove', this.onMouseMove)
    //       document.removeEventListener('mouseup', this.onMouseUp)
    //     }
    // }

    onMouseMove = (e: MouseEvent) => {
        if (!this.state.dragging) {
            return;
        }

        let left = e.x - this._draggable!.offsetWidth / 2;
        let top = e.y - this._draggable!.offsetHeight / 2;

        if(left > window.innerWidth) {
            left = window.innerWidth - this._draggable!.clientWidth;
        }
        else if(left < 0) {
            left = 0;
        }

        if(top > window.innerHeight) {
            top = window.innerHeight - this._draggable!.clientHeight;
        }
        else if(top < 0) {
            top = 0;
        }

        // console.log(left, top, window.innerWidth, window.innerHeight);
        // console.log(this._draggable);

        this.setState({
            left,
            top
        })

        e.stopPropagation();
        e.preventDefault();
      }
    
      onMouseUp = (e: MouseEvent) => {
        this.setState({dragging: false});
        e.stopPropagation();
        e.preventDefault();
      }
    
      onMouseDown = (e: React.MouseEvent<Element, MouseEvent>) => {
        if (e.button !== 0) {
            return;
        }

        const left = e.clientX - this._draggable!.offsetWidth / 2;
        const top = e.clientY - this._draggable!.offsetHeight / 2;

        // console.log(left, top);

        this.setState({
            dragging: true,
            left,
            top,
        });
    
        e.stopPropagation();
        e.preventDefault();
      }

    render() {
        const { top, left } = this.state;

        return (
            <div className='draggable' style={{top: top, left: left}}
            ref={c => this._draggable = c}
            onMouseDown={this.onMouseDown}
            >
                {this.props.children}
            </div>
        )
    }
}