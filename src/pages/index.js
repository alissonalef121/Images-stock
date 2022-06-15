import { useState, useEffect } from "react"
import Image from "next/image"
import styled from 'styled-components';
import GlobalStyle from '../globalStyles'

export default function Home() {

    const [images, setImages] = useState([])

    useEffect( ()=> {
        fetch('https://picsum.photos/v2/list?&limit=1112')
            .then( data => {
                if(data.ok){
                    return data.json()
                }
            })
            .then( res => {
                setImages(res)
            })
    }, [])

    const List = styled.ul`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0;
        padding: 0;
        li{
            cursor: pointer;
            margin: 4px 6px;
            &:hover{
                img{
                    transform: scale(1.2);
                    z-index: 99999;
                }
                &:after{
                    visibility: visible;
                    opacity: 1;
                    transition: all .5s ease 0s;

                }
            }
            &:after{
                content: '';
                width: 100%;
                height: 100%;
                position: fixed;
                visibility: hidden;
                opacity: 0;
                background: rgba(0,0,0, 65%);
                z-index: 9999;
                top: 0;
                left: 0;
                pointer-events: none;
                transition: all .1s ease 0s;
            }
            img{
                transition: transform .15s ease 0s;
                min-width: max-content!important;
            }
        }
    `

    return (
        <>
            <List>
                {
                    images.map( element => (
                        <li key={element.id}>
                            <Image
                                src={element.download_url}
                                width={160}
                                height={160}
                            />
                        </li>
                    ))
                }
            </List>

            <GlobalStyle />
        </>
    )
}