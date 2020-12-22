import React from 'react';
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import * as MdIcons from 'react-icons/md'


export const SidebarData = [
    {
        title: 'Home',
        path: '/home', 
        icon: <AiIcons.AiFillHome/>, 
        cName: 'nav-text'
    },
    {
        title: 'PMM',
        path: '/pmm', 
        icon: <MdIcons.MdSystemUpdate/>,
        cName: 'nav-text'
    },
    {
        title: 'VAL',
        path: '/val', 
        icon: <BiIcons.BiServer/>,
        cName: 'nav-text'
    },
]