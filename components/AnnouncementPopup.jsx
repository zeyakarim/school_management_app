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
            keepMounted
            open={isOpen}
            onClose={onClose}
            TransitionComponent={Transition}
            PaperProps={{
                style: { position: 'absolute', borderRadius: '15px' },
                className: "top-[0%] right-[1%] m-0"
            }}
        >
            <DialogTitle className="flex justify-between">
                <p>Announcements</p>
                <div>
                    <span className="mr-3 cursor-pointer" onClick={handleSeeAllNotifications}>
                        <Tooltip title="See All" arrow>
                            <ReadMore color="primary" />
                        </Tooltip>
                    </span>
        
                    <span className="mr-3 cursor-pointer">
                        <Tooltip title="Mark all as read" arrow>
                            <DraftsOutlined color="primary" />
                        </Tooltip>
                    </span>
        
                    <Close className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose} />
                </div>
            </DialogTitle>
        
            {/* Remove overflow from DialogContent and let InfiniteScroll handle it */}
            <DialogContent
                dividers
                className="p-0 pl-4"
                sx={{
                    overflow: "hidden", // Prevent DialogContent from adding a scrollbar
                    height: "75vh", // Set a height limit
                }}
            >
                {announcements?.length !== 0 && (
                    <InfiniteScroll
                        dataLength={announcements?.length}
                        next={fetchMoreData}
                        hasMore={page - 1 < maxPages}
                        height={"100%"} // Ensure it fills the parent DialogContent
                        style={{ overflowX: "hidden" }} // Prevent horizontal scrollbar
                        loader={
                            page - 1 !== maxPages && (
                                <ListItem>
                                    <ListItemIcon>
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" width="50%" />
                                    </ListItemText>
                                </ListItem>
                            )
                        }
                    >
                        <List sx={{ overflowY: "auto", maxHeight: "calc(75vh - 64px)" }}>
                            {announcements?.map((item, index) => (
                                <ListItemButton
                                    key={item?.id}
                                    sx={{
                                        backgroundColor: item?.isRead ? "white" : "#f9f9f9",
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
                                                className={`text-sm ${
                                                    item?.isRead
                                                        ? "text-gray-400 font-normal"
                                                        : "text-gray-500 font-bold"
                                                }`}
                                            >
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography
                                                    className={`text-gray-400 ${
                                                        item?.isRead ? "" : "text-gray-500"
                                                    }`}
                                                >
                                                    {item.description}
                                                </Typography>
                                                <Typography
                                                    className={`text-gray-400 text-sm ${
                                                        item?.isRead ? "" : "text-gray-500"
                                                    }`}
                                                >
                                                    {formattedDate(item?.created_at)}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItemButton>
                            ))}
                            {/* No notifications */}
                            {maxPages === 0 && (
                                <ListItem>
                                    <ListItemIcon>
                                        <DraftsOutlined className="text-gray-400" />
                                    </ListItemIcon>
                                    <ListItemText primary="No notifications have been received." />
                                </ListItem>
                            )}
                        </List>
                    </InfiniteScroll>
                )}
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