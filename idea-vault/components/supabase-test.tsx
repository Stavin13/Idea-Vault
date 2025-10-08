'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DatabaseSetupGuide } from './database-setup-guide'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function SupabaseTest() {
  const [status, setStatus] = useState<string>('Testing connection...')
  const [needsSetup, setNeedsSetup] = useState(false)
  const [tables, setTables] = useState<string[]>([])

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { error } = await supabase.from('ideas').select('count', { count: 'exact', head: true })
        
        if (error) {
          if (error.message.includes('relation "public.ideas" does not exist')) {
            setStatus('Database tables not created yet')
            setNeedsSetup(true)
          } else {
            setStatus(`Connection error: ${error.message}`)
            setNeedsSetup(true)
          }
        } else {
          setStatus('Connected to Supabase successfully!')
          setNeedsSetup(false)
          
          // Try to get table info
          const { data: tableData } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
          
          if (tableData) {
            setTables(tableData.map(t => t.table_name))
          }
        }
      } catch (err) {
        setStatus(`Unexpected error: ${err}`)
        setNeedsSetup(true)
      }
    }

    testConnection()
  }, [])

  if (needsSetup) {
    return <DatabaseSetupGuide />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Database Status</span>
          <Badge variant="default">Ready</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">✅ {status}</p>
        {tables.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Available tables:</p>
            <ul className="text-sm text-muted-foreground">
              {tables.map(table => (
                <li key={table}>• {table}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}