import { Dialog, DialogContent, DialogTitle, Slide, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Tooltip, Typography  } from '@mui/material';
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment';
import { ReadMore, MarkEmailUnreadOutlined, DraftsOutlined, Close  } from '@mui/icons-material';
import { forwardRef } from 'react';
import { useRouter } from 'next/navigation';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AnnouncementDialog = (props) => {
    const { isOpen, onClose, announcements, fetchMoreData, maxPages, page } =props;
    const router = useRouter();

    const handleSeeAllNotifications = () => {
        onClose()
        router.push('/announcements')
    }
  
    return (
        <Dialog
            // fullScreen
            keepMounted
            open={isOpen}
            onClose={onClose}
            TransitionComponent={Transition}
            PaperProps={{
                className: "absolute top-[7%] right-[1%] m-0 rounded-[15px]"
            }}
        >
            <DialogTitle className='flex justify-between'>
                <p>Announcements</p>
                <div>
                    <span className='mr-3 cursor-pointer' onClick={handleSeeAllNotifications}>
                        <Tooltip title="See All" arrow> <ReadMore color='primary'/> </Tooltip>
                    </span>
              
                    <span className='mr-3 cursor-pointer'>
                        <Tooltip title="Mark all as read" arrow> <DraftsOutlined color='primary'/> </Tooltip>
                    </span>

                    <Close className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose} />
                </div>
            </DialogTitle>

            <DialogContent dividers className='p-0 px-4 overflow-y-hidden rounded-xl'>
                {announcements?.length !== 0 && 
                    <InfiniteScroll
                        dataLength={announcements?.length}
                        next={fetchMoreData}
                        hasMore={true}
                        height={'auto'}
                        style={{maxHeight:'75vh'}}
                        loader={
                            page-1 !== maxPages ? 
                            <ListItem>
                                <ListItemIcon>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Skeleton variant="text"  />
                                    <Skeleton variant="text"  />
                                    <Skeleton variant="text"  width='50%'/>
                                </ListItemText>
                            </ListItem>
                            : ''
                        }
                    >
                        <List>
                            {announcements?.map((item,index) => (
                                <ListItemButton
                                    key={item?.id}
                                    sx={{
                                        backgroundColor: item?.isRead === true ? 'white': '#f9f9f9',
                                        borderRadius: 5,  
                                        marginBottom: index === announcements?.length - 1 ? 0 : 1,
                                    }}
                                >
                                    <ListItemIcon>
                                        {item?.isRead ? (
                                            <DraftsOutlined className="text-gray-400" />
                                        ) : (
                                            <MarkEmailUnreadOutlined className="text-gray-500" />
                                        )}
                                    </ListItemIcon>

                                    <ListItemText 
                                        primary={
                                            <Typography 
                                                className={`text-sm ${item?.isRead ? 'text-gray-400 font-normal' : 'text-gray-500 font-bold'}`}
                                            >
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography className={`text-gray-400 ${item?.isRead ? '' : 'text-gray-500'}`}>
                                                    {item.description}
                                                </Typography>
                                                <Typography className={`text-gray-400 text-sm ${item?.isRead ? '' : 'text-gray-500'}`}>
                                                    {formattedDate(item?.created_at)}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            ))}
                            {/* Not have Notifications */}
                            {maxPages === 0 && (
                                <ListItem>
                                    <ListItemIcon>
                                        <DraftsOutlined className="text-gray-400" />
                                    </ListItemIcon>
                                    <ListItemText primary = "No notifications have been received.">
                                    </ListItemText>
                                </ListItem>
                            )}
                        </List>
                    </InfiniteScroll>
                }
            </DialogContent>
        </Dialog>
    );
}

const formattedDate = (date) => {
    // date is today
    if(moment(date).isSame(moment(), 'day')){
        return moment(date).format('h:mm:ss A');
    } else {
        const yesterday = moment().subtract(1, 'days').startOf('day');
        if(moment(date).isSame(yesterday, 'day')){
            return `Yesterday, ${moment(date).format('h:mm:ss A')}`;
        }
        else {
            return moment(date).format('MMM DD YYYY');
        }
    }
}

export default AnnouncementDialog;