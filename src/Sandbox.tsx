import React, { forwardRef, PropsWithChildren, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import './Sandbox.css';

interface ItemType {
  id: number;
  name: string;
  color: string;
}

const randomChar = () => String.fromCharCode(97 + Math.floor(Math.random()*26));

const randomName = () => {
  let name = randomChar().toUpperCase();
  for (let i=0; i<6; i++) {
    name += randomChar();
  }
  return name;
}

const initialItems1: ItemType[] = [];
const initialItems2: ItemType[] = [];
const size = 10;
for (let i=0; i<size; i++) {
  initialItems1.push({
    id: i,
    name: randomName(),
    color: "#" + Math.floor(Math.random()*0x1000000).toString(16).padStart(6, "0"),
  });
  initialItems2.push({
    id: i+size,
    name: randomName(),
    color: "#" + Math.floor(Math.random()*0x1000000).toString(16).padStart(6, "0"),
  });
}

interface SortableContainerProps {
  color?: string | undefined
}

const SortableContainer = forwardRef<HTMLDivElement, PropsWithChildren<SortableContainerProps>>((props, ref) => (
  <div
    ref={ref}
    className='sortable-container'
    style={{
      backgroundColor: props.color
    }}
  >
    {props.children}
  </div>
));

const sortableContainerStyle = (color: string) => forwardRef<HTMLDivElement>((props, ref) => (
  <SortableContainer
    ref={ref}
    color={color}
  >
    {props.children}
  </SortableContainer>
));

const RedSortableContainer = sortableContainerStyle("lightcoral");

function Sandbox() {
  const [items1, setItems1] = useState(initialItems1);
  const [items2, setItems2] = useState(initialItems2);
  return (
    <div className='sandbox-container'>
      <ReactSortable
        tag={SortableContainer}
        list={items1}
        setList={setItems1}
        direction="horizontal"
        animation={1000}
        group={{
          name: "g1",
          put: true,
        }}
      >
        {items1.map((item) => (
          <div
            className="sortable-item"
            style={{
              backgroundColor: item.color
            }}
            key={item.id}
          >{item.name}</div>
        ))}
      </ReactSortable>
      <ReactSortable
        tag={RedSortableContainer}
        list={items2}
        setList={setItems2}
        direction="horizontal"
        animation={1000}
        group={{
          name: "g2",
          put: true,
        }}
      >
        {items2.map((item) => (
          <div
            className="sortable-item"
            style={{
              backgroundColor: item.color
            }}
            key={item.id}
          >{item.name}</div>
        ))}
      </ReactSortable>
    </div>
  );
}

export default Sandbox;
