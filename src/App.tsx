import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled, { createGlobalStyle } from 'styled-components'
import { BeatLoader } from 'react-spinners'

import Thumbnail from './Thumbnail'

const App:React.FC = () => {

  const [objects, setObjects] = useState<any[]>([])
  const [pageNumber, setPageNumber] = useState(18)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, settotalCount] = useState(0)

  const URL = 'https://www.myminifactory.com/api/v2/users/myminifactory/objects'
  const OBJECTS_PER_PAGE = 20

  useEffect(() => {
    async function fetchData () {
      setIsLoading(true)
      const { data } = await axios({
        method: 'get',
        url: URL,
        params: {
          page: pageNumber,
          per_page: OBJECTS_PER_PAGE
        },
        headers: {
          Key: process.env.REACT_APP_API_KEY
        }
    })
    setObjects(data.items)
    settotalCount(data.total_count)
    setIsLoading(false)
    }
    fetchData()
  }, [pageNumber, isFeatured])

  const goToPreviousPage = () => {
    if (pageNumber === 1) return
    setPageNumber (pageNumber => pageNumber - 1)
  }

  const goToNextPage = () => {
    if (Math.floor(totalCount / OBJECTS_PER_PAGE) + 1 === pageNumber) return
    setPageNumber (pageNumber => pageNumber + 1)
  }

  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Title> My Mini Factory Designs </Title>
        { isLoading ? 
          <LoaderContainer>
            <BeatLoader/>
          </LoaderContainer>
          :
          <Thumbnails>
            { isFeatured ? 
              objects.filter(object => object.featured).map(object => <Thumbnail key={object.id} object={object}/>) 
            : 
              objects.map(object => <Thumbnail key={object.id} object={object}/>) 
            }
          </Thumbnails>
        }
        <ButtonGroup>
          <NavigationButton onClick={goToPreviousPage}>Previous </NavigationButton>    
          <NavigationButton onClick={goToNextPage}>Next </NavigationButton>
        </ButtonGroup>

        <FilterContainer>
          <FilterButton onClick={() => setIsFeatured(isFeatured => !isFeatured) }>
           {isFeatured ? 'Show other designs' : 'Show only feature designs'}
          </FilterButton>
        </FilterContainer>
      </Container>
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
`

const Title = styled.h1`
  margin: 0 auto;
  padding: 50px;
`

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const LoaderContainer = styled.div`
  margin: 0 auto;
  padding-top: 36px;
`

const Thumbnails = styled.div`
  margin: 0 auto;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  row-gap: 150px;
  column-gap: 150px;
  margin-bottom: 100px;
`

const ButtonGroup = styled.div` 
  display: flex;
  margin: auto auto 0;
  padding: 6px;
`

const Button = styled.button`
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`

const NavigationButton = styled(Button)`
  background-color: #00abd5;
  width: 120px;
  &:first-of-type {
    margin-right: 35px;
  }
`

const FilterContainer = styled.div`
  margin: 0 auto;
  padding-bottom: 16px;
`

const FilterButton = styled(Button)`
  background-color: #8f32a8;
  width: 300px;
`