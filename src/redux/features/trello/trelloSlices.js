import React from 'react'
import { createSlice, current } from '@reduxjs/toolkit'
import dummyColumns from '../../../assets/dummyColumns.json'
import { v4 as uuid } from 'uuid';



var data = JSON.parse(localStorage.getItem('data'));
if(data){
    var initialState = data
}else{
    localStorage.setItem('data', JSON.stringify(dummyColumns));
    initialState = JSON.parse(localStorage.getItem('data'));
}

// const initialState = dummyColumns

export const trelloSlices = createSlice({
  name: 'trello',
  initialState,
  reducers: {
    addCard: (state, action) => {
      Object.entries(state).map(([id, columns])=>{
        if(id === action.payload.group){   
            state[id].items = [...state[id].items,{id:uuid(),content:action.payload.name,description:action.payload.description}]
        }
    })
    

    localStorage.setItem('data', JSON.stringify(state));

    },
    updateCard: (state, action) => {
      Object.entries(state).map(([id, columns])=>{
        columns.items.map((data,index)=>{
          

            //update log remove from current column and insert into other column
           
            if(action.payload.itemId == data.id){
              
              state[id].items[index].content = action.payload.name
              state[id].items[index].description = action.payload.description

                if(id != action.payload.group){
                    
                    const sourceColumn = state[id]
                    const destColumn = state[action.payload.group]
                    
            
                    let sourceItems = [...sourceColumn.items]
                    let destItems = [...destColumn.items]
            
                    let [removed] = sourceItems.splice(index,1)
                    
                    destItems.splice(destItems.length,0,removed)
                    
                    state[id].items = sourceItems
                    state[action.payload.group].items = destItems               
                }
                

                
            }
        })
    })
    localStorage.setItem('data', JSON.stringify(state));


    },
    deleteCard: (state, action) => {
      Object.entries(state).map(([id, columns])=>{
        columns.items.map((data,index)=>{
            if(action.payload.itemId == data.id){

                const sourceColumn = state[id]
                const sourceItems = [...sourceColumn.items]
                const [removed] = sourceItems.splice(index,1)

                state[id].items = sourceItems

            }

        }) 
      })
    localStorage.setItem('data', JSON.stringify(state));


    },

    dndUpdateCard: (state,action)=> {
      state = action.payload
      localStorage.setItem('data', JSON.stringify(state));

    }
  },
})


// Action creators are generated for each case reducer function
export const { addCard, updateCard, deleteCard, dndUpdateCard } = trelloSlices.actions

export default trelloSlices.reducer
