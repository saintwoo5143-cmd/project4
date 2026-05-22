import React, { useState } from 'react'
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  IconButton,
  Fade
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { motion, AnimatePresence } from 'framer-motion'

const ImageCard = ({ item, onClick }) => (
  <Card>
    <CardActionArea onClick={onClick}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
        <CardMedia
          component={motion.img}
          layoutId={`image-${item.id}`}
          image={item.image}
          sx={{ width: { xs: '100%', sm: 120 }, aspectRatio: '1 / 1.6', objectFit: 'cover' }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.subtitle}
          </Typography>
        </CardContent>
      </Box>
    </CardActionArea>
  </Card>
)

export default function ImageGrid({ items = [] }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleOpen = (item) => {
    setSelected(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3} justifyContent="center" sx={{ position: 'relative' }}>
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <Grid
              component={motion.div}
              layout
              layoutId={`card-${item.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ layout: { type: 'spring', stiffness: 500, damping: 40 }, default: { duration: 0.18 } }}
              item
              key={item.id}
              xs={12}
              sm={8}
              md={6}
              lg={4}
            >
              <ImageCard item={item} onClick={() => handleOpen(item)} />
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth TransitionComponent={Fade} transitionDuration={1000}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {selected?.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ color: 'inherit', position: 'absolute', right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4, minHeight: 360 }}>
          {selected?.image && (
            <motion.img
              layoutId={`image-${selected?.id}`}
              src={selected.image}
              alt={selected.title}
              style={{ height: '360px', marginBottom: 12, aspectRatio: '1 / 1.6'}}
            />
          )}
          <DialogContentText>{selected?.subtitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">수정</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
