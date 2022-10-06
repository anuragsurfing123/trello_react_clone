import React, { useState, useEffect } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import AddCard from '../components/AddCard'
import Button from 'react-bootstrap/Button';
import {addCard, updateCard, dndUpdateCard} from '../redux/features/trello/trelloSlices'
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {

    const dispatch = useDispatch()

    const {trello} = useSelector((state)=>state)
    let columnsFromBackend = trello
    
    const [columns,setColumns] = useState(columnsFromBackend)

    useEffect(()=>{
        columnsFromBackend = trello
        setColumns(columnsFromBackend)

    },[trello])


    //handle modal hide show

    const [show, setShow] = useState(false);
    const [type,setType] = useState({})

    const handleClose = () => setShow(false);

    const handleShow = (type,itemId='') => {
        setShow(true)
        if(type == "update"){
            Object.entries(columns).map(([id, column])=>{
                column.items.map((data,index)=>{
                    
                    if(itemId == data.id){   
                        setType({
                            type:"update",
                            itemId:itemId,
                            updateItem:data,
                            cardGroup:id

                        })

                    }
                })
            })
            

        }else{
           
            setType({
                type:"add",
                itemId:""
            })

        }      

    };


    const onDragEnd = (result, columns, setColumns)=>{
        if(!result.destination) return;
        const {source, destination} = result;
        if(source.droppableId !== destination.droppableId){
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
    
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
    
            const [removed] = sourceItems.splice(source.index,1)
            
            destItems.splice(destination.index,0,removed)

            let colDataUpdate = {
                ...columns,
                [source.droppableId]:{
                    ...sourceColumn,
                    items:sourceItems
                },
                [destination.droppableId]:{
                    ...destColumn,
                    items:destItems
                }
            }
    
            setColumns(colDataUpdate)

            dispatch(dndUpdateCard(colDataUpdate))
    
        }
        else{
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index,1)
            copiedItems.splice(destination.index,0,removed);

            let colDataUpdate = {
                ...columns,
                [source.droppableId]:{
                    ...column,
                    items:copiedItems
                }
            }
    
            setColumns(colDataUpdate)
            dispatch(dndUpdateCard(colDataUpdate))
        
        }
            
    
    }


  return (
    <div>
        <div><Toaster/></div>
        <div className="modal1">
          
            <Button variant="primary" onClick={()=>handleShow("add")}>
                Add Task &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="20px"  shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 419 511.67"><path d="M314.98 303.62c57.47 0 104.02 46.59 104.02 104.03 0 57.47-46.58 104.02-104.02 104.02-57.47 0-104.02-46.58-104.02-104.02 0-57.47 46.58-104.03 104.02-104.03zM41.73 59.27h23.93v24.38H41.73c-4.54 0-8.7 1.76-11.8 4.61l-.45.49c-3.14 3.13-5.1 7.48-5.1 12.24v315.53c0 4.75 1.96 9.1 5.1 12.24 3.13 3.15 7.48 5.11 12.25 5.11h142.62c1.68 8.44 4.17 16.6 7.36 24.38H41.73c-11.41 0-21.86-4.71-29.42-12.26C4.72 438.44 0 427.99 0 416.52V100.99c0-11.48 4.7-21.92 12.25-29.47l.79-.72c7.5-7.13 17.62-11.53 28.69-11.53zm297.55 217.37V100.99c0-4.74-1.96-9.09-5.12-12.24-3.11-3.15-7.47-5.1-12.24-5.1h-23.91V59.27h23.91c11.45 0 21.86 4.72 29.42 12.26 7.61 7.56 12.32 18.02 12.32 29.46V283.6c-7.79-3.06-15.95-5.41-24.38-6.96zm-206.75-8.07c-7.13 0-12.92-5.79-12.92-12.92s5.79-12.93 12.92-12.93h142.83c7.13 0 12.92 5.8 12.92 12.93s-5.79 12.92-12.92 12.92H132.53zM89.5 241.22c7.98 0 14.44 6.46 14.44 14.44 0 7.97-6.46 14.43-14.44 14.43-7.97 0-14.44-6.46-14.44-14.43 0-7.98 6.47-14.44 14.44-14.44zm0 78.62c7.98 0 14.44 6.46 14.44 14.44 0 7.97-6.46 14.43-14.44 14.43-7.97 0-14.44-6.46-14.44-14.43 0-7.98 6.47-14.44 14.44-14.44zm43.04 27.35c-7.13 0-12.93-5.79-12.93-12.92s5.8-12.93 12.93-12.93h80.96a133.608 133.608 0 0 0-17.26 25.85h-63.7zM89.5 162.6c7.98 0 14.44 6.46 14.44 14.44 0 7.98-6.46 14.44-14.44 14.44-7.97 0-14.44-6.46-14.44-14.44 0-7.98 6.47-14.44 14.44-14.44zm43.03 27.37c-7.13 0-12.92-5.8-12.92-12.93s5.79-12.92 12.92-12.92h142.83c7.13 0 12.92 5.79 12.92 12.92s-5.79 12.93-12.92 12.93H132.53zM93 39.4h46.13C141.84 17.18 159.77 0 181.52 0c21.62 0 39.45 16.95 42.34 38.94l46.76.46c2.61 0 4.7 2.09 4.7 4.71v51.84c0 2.6-2.09 4.7-4.7 4.7H93.05c-2.56 0-4.71-2.1-4.71-4.7V44.11A4.638 4.638 0 0 1 93 39.4zm88.03-19.25c12.3 0 22.26 9.98 22.26 22.27 0 12.3-9.96 22.26-22.26 22.26-12.29 0-22.26-9.96-22.26-22.26 0-12.29 9.97-22.27 22.26-22.27zm118.39 346.9c-.04-4.59-.46-7.86 5.23-7.79l18.45.23c5.95-.04 7.53 1.86 7.46 7.43v25.16h25.02c4.59-.03 7.86-.46 7.78 5.24l-.22 18.44c.03 5.96-1.86 7.54-7.43 7.48h-25.15v25.14c.07 5.57-1.51 7.46-7.46 7.43l-18.45.22c-5.69.09-5.27-3.2-5.23-7.79v-25h-25.16c-5.59.06-7.47-1.52-7.44-7.48l-.22-18.44c-.09-5.7 3.2-5.27 7.79-5.24h25.03v-25.03z"/></svg>
                
            </Button>

            <AddCard handleClose={handleClose} handleShow={handleShow} show={show} type={type}/>
            
        </div>
        
        <div className='row' style={{justifyContent:'center', height:'100%',gridGap: "2rem"}}>
        
        <DragDropContext onDragEnd={result => onDragEnd(result,columns,setColumns)}>
              {
                  Object.entries(columns).map(([id, columns])=>{
                      return(
                          <div className='col-lg-3 col-md-2 col-xs-1' style={{alignItems:'center', margin:"1rem", color:'#ebecf0'}}>
                              {/* <h2>{columns.name}</h2> */}
                              <div style={{margin:8}}>
                                  <Droppable droppableId={id} key={id} >
                                      {(provided, snapshot)=>{
                                          return(
                                              <div 
                                              {...provided.droppableProps}
                                              ref={provided.innerRef}
                                              style={{
                                                  background: snapshot.isDraggingOver ? 'lightblue' : columns.name=='Todo' ? '#dbd4f2' : columns.name=='InProgress' ? '#efdbd5' : '#daeeda',
                                                  padding:4,
                                                  width:400,
                                                  minHeight:500,
                                                  borderRadius:"5px"
                                              }}
                                              >
                                                
                                                  <h4>{columns.name}</h4>
                                                  {columns.items.map((item,index)=>{
                                                      return(
                                                      <Draggable draggableId={item.id} index={index} key={item.id}>
                                                          {(provided,snapshot)=>{
                                                              
                                                              return(
                                                                  
                                                                  <div
                                                                  ref={provided.innerRef}
                                                                  {...provided.draggableProps}
                                                                  {...provided.dragHandleProps}
                                                                  style={{
                                                                      userSelect:'none',
                                                                      padding:16,
                                                                      margin:'10px 10px 10px 10px',
                                                                      minHeight:'3rem',
                                                                      backgroundColor: snapshot.isDragging ? '#5133AB' : columns.name=='Todo' ? '#5133AB' : columns.name=='InProgress' ? '#DC572E' : '#00A600',
                                                                      color:'white',
                                                                      borderRadius:"5px",
                                                                      ...provided.draggableProps.style
                                                                  }}
                                                                  >
                                                                    <div className='row'>
                                                                        <div className='col-lg-10'>
                                                                            <h5>{item.content}</h5>
                                                                            {item.description}

                                                                        </div>
                                                                        <div className='col-lg-2'>
                                                                           <svg onClick={()=>handleShow("update",item.id)}  fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"/></svg>


                                                                        </div>

                                                                    </div>
                                                                  
                                                                      
                                                                     
  
  
                                                                  </div>
                                                              )
                                                          }}
                                                      </Draggable>
                                                      )
                                                  })}
                                                  {provided.placeholder}
                                              </div>
                                          )
                                      }}
  
                                  </Droppable>
                              </div>
                          </div>
                      )
                  })
              }
        </DragDropContext>
      </div>
    </div>
  )
}

export default Home
