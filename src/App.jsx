import React, { useState, useMemo, useEffect } from 'react'
import { CssBaseline, Container, Typography, AppBar, Toolbar, Box, TextField, Button } from '@mui/material'
import ImageGrid from './components/ImageGrid'

const sampleItems = Array.from({ length: 12 }).map((_, i) => ({
  id: `item-${i}`,
  title: `책 이름 ${i + 1}`,
  subtitle: `책에 관한 설명입니다. ${i + 1}.`,
  image: `/bookcover1.png`
}))

export default function App() {
  const [query, setQuery] = useState('')
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [savedApiKey, setSavedApiKey] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('apiKey') || ''
    setSavedApiKey(saved)
    setApiKeyInput(saved)
  }, [])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sampleItems
    return sampleItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
      )
    })
  }, [query])

  return (
    <>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Image Gallery
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="책 제목이나 설명으로 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ background: 'white', borderRadius: 1, width: { xs: 180, sm: 360 } }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'right', gap: 1 }}>
            <TextField
              size="small"
              type="password"
              variant="outlined"
              placeholder="API Key"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              sx={{ background: 'white', borderRadius: 1, width: { xs: 140, sm: 220 } }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                localStorage.setItem('apiKey', apiKeyInput)
                setSavedApiKey(apiKeyInput)
              }}
              disabled={apiKeyInput === savedApiKey}
            >
              {apiKeyInput === savedApiKey ? 'Saved' : 'Confirm'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Image Grid
        </Typography>
      </Container>

      <ImageGrid items={filteredItems} />
    </>
  )
}
