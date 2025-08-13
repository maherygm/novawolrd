import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './layout/sidebar'

import { menus } from './constants/navigation';


const DashboardLayout = () => {
	return (
		<div className='bg-point-background h-dvh-screen w-screen bg-light-custom-background dark:bg-slate-950 dark:bg-opacity-25'>
			<div className="bg-gradient-background flex h-[full] w-screen flex-col-reverse justify-between bg-cover sm:h-screen sm:flex-row">

				<Sidebar menuGroups={menus} />

				<div className="main-content h-[86.3vh] overflow-hidden overflow-y-auto sm:h-[96%] m-2 sm:w-full">
					<Outlet />
				</div>
			</div>

		</div>
	)
}

export default DashboardLayout